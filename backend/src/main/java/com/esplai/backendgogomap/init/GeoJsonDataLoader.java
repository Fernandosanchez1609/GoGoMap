package com.esplai.backendgogomap.init;

import com.esplai.backendgogomap.models.dtos.geojson.RawFeatureCollectionDTO;
import com.esplai.backendgogomap.models.dtos.geojson.RawFeatureDTO;
import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.models.enums.Ods;
import com.esplai.backendgogomap.repositories.MapPointRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j // Utilidad para logs
public class GeoJsonDataLoader implements CommandLineRunner {

    private final MapPointRepository mapPointRepository;
    private final ObjectMapper objectMapper; // Para poder trabajar con Json

    @Override
    public void run(String... args) throws Exception {

        log.info("Iniciando escaneo de archivos GeoJSON ODS...");

        try {

            List<MapPoint> existingPoints = mapPointRepository.findAll();
            Set<String> existingCoordinates = existingPoints.stream()
                    .map(p -> p.getLatitude() + "_" + p.getLongitude() + "_" + p.getOds().getOdsNumber())
                    .collect(Collectors.toSet());

            log.info("Puntos actuales en la base de datos: {}", existingPoints.size());

            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] resources = resolver.getResources("classpath:data/ods*.geojson");

            List<MapPoint> newPointsToSave = new ArrayList<>();

            for (Resource resource : resources) {
                String filename = resource.getFilename();
                Integer odsNumber = extraerNumeroOds(filename);

                if (odsNumber == null) {
                    continue;
                }

                Ods odsEnum;
                try {
                    odsEnum = Ods.fromNumber(odsNumber);
                } catch (IllegalArgumentException e) {
                    log.warn("Número ODS {} no reconocido en el archivo {}. Saltando...", odsNumber, filename);
                    continue;
                }

                try {
                    InputStream inputStream = resource.getInputStream();
                    RawFeatureCollectionDTO featureCollection = objectMapper.readValue(inputStream, RawFeatureCollectionDTO.class);

                    for (RawFeatureDTO rawFeature : featureCollection.getFeatures()) {
                        if (rawFeature.getProperties() == null || rawFeature.getGeometry() == null || rawFeature.getGeometry().getCoordinates().isEmpty()) {
                            continue;
                        }

                        // Extraemos las coordenadas del JSON
                        Double lon = rawFeature.getGeometry().getCoordinates().get(0);
                        Double lat = rawFeature.getGeometry().getCoordinates().get(1);

                        // Añadimos el número de ODS a la clave para permitir mismos puntos del mapa pero con distinto ODS
                        String uniqueKey = lat + "_" + lon + "_" + odsEnum.getOdsNumber();

                        // 2. Si la huella digital exacta ya existe en la BD, la saltamos
                        if (existingCoordinates.contains(uniqueKey)) {
                            continue;
                        }

                        // Si llegamos aquí, es un punto totalmente nuevo
                        MapPoint point = new MapPoint();

                        // Comprobamos que el título no esté vacío
                        String titulo = rawFeature.getProperties().getNombre();
                        if (titulo == null || titulo.trim().isEmpty()) {
                            titulo = "Punto de interés (ODS " + odsEnum.getOdsNumber() + ")";
                        }

                        point.setTitle(titulo);
                        point.setDescription(rawFeature.getProperties().getDescripcion());
                        point.setAddress(rawFeature.getProperties().getDireccion());
                        point.setLongitude(lon);
                        point.setLatitude(lat);
                        point.setStatus("Activo");
                        point.setOds(odsEnum);

                        newPointsToSave.add(point);
                    }
                } catch (Exception e) {
                    log.error("El archivo {} está corrupto o no es un JSON válido. Saltando...", filename);
                }
            }

            // 3. Guardamos solo los que sean nuevos
            if (!newPointsToSave.isEmpty()) {
                mapPointRepository.saveAll(newPointsToSave);
                log.info("¡Actualización completada! Se han añadido {} nuevos puntos a la base de datos.", newPointsToSave.size());
            } else {
                log.info("La base de datos está 100% sincronizada. No se encontraron puntos nuevos en los archivos.");
            }

        } catch (Exception e) {
            log.error("Error crítico al procesar la ingesta masiva: ", e);
        }
    }

    // Metodo auxiliar para sacar el número del nombre del archivo (ej: "ods16_bomberos.geojson" -> 16)
    private Integer extraerNumeroOds(String filename) {
        if (filename == null) return null;
        Pattern pattern = Pattern.compile("ods0*(\\d+)_"); // Busca "ods", ignora ceros a la izquierda y captura el número
        Matcher matcher = pattern.matcher(filename);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return null;
    }
}