package com.esplai.backendgogomap.init;

import com.esplai.backendgogomap.models.dtos.geojson.RawFeatureCollectionDTO;
import com.esplai.backendgogomap.models.dtos.geojson.RawFeatureDTO;
import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.repositories.MapPointRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j // Anotación de Lombok para poder usar 'log.info' e imprimir por consola
public class GeoJsonDataLoader implements CommandLineRunner {

    private final MapPointRepository mapPointRepository;
    private final ObjectMapper objectMapper; // Herramienta de Spring para leer JSON

    @Override
    public void run(String... args) throws Exception {

        if (mapPointRepository.count() > 0) {
            log.info("Los puntos ya están cargados en la base de datos. Saltando ingesta de GeoJSON...");
            return;
        }

        log.info("Iniciando la lectura del archivo GeoJSON de cargadores...");

        try {

            InputStream inputStream = new ClassPathResource("data/cargadores_malaga_4326.geojson").getInputStream();


            RawFeatureCollectionDTO featureCollection = objectMapper.readValue(inputStream, RawFeatureCollectionDTO.class);

            List<MapPoint> pointsToSave = new ArrayList<>();


            for (RawFeatureDTO rawFeature : featureCollection.getFeatures()) {
                MapPoint point = new MapPoint();

                point.setTitle(rawFeature.getProperties().getNombre());
                point.setDescription(rawFeature.getProperties().getDescripcion());
                point.setAddress(rawFeature.getProperties().getDireccion());

                // GeoJSON guarda las coordenadas en este orden: [Longitud, Latitud, Altitud]
                point.setLongitude(rawFeature.getGeometry().getCoordinates().get(0));
                point.setLatitude(rawFeature.getGeometry().getCoordinates().get(1));

                // Valores por defecto para esta ingesta inicial
                point.setStatus("Activo");
                point.setOdsId(7L); // Asignamos ODS 7 (Energía asequible y no contaminante) a los cargadores

                pointsToSave.add(point);
            }

            // Guardamos la lista entera en MySQL
            mapPointRepository.saveAll(pointsToSave);
            log.info("¡Éxito! Se han cargado {} puntos en la base de datos.", pointsToSave.size());

        } catch (Exception e) {
            log.error("Error al procesar el archivo GeoJSON: ", e);
        }
    }
}