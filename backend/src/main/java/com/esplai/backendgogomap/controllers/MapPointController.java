package com.esplai.backendgogomap.controllers;


import com.esplai.backendgogomap.mappers.MapPointMapper;
import com.esplai.backendgogomap.models.dtos.request.UserActionRequestDTO;
import com.esplai.backendgogomap.models.dtos.response.MapPointDetailResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserActionResponseDTO;
import com.esplai.backendgogomap.services.MapPointService;
import com.esplai.backendgogomap.services.UserActionService;
import jakarta.validation.Valid;
import com.esplai.backendgogomap.exceptions.dto.ApiErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/points")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") //SOLO EN DESARROLLO, EN PRODUCCIÓN DEBERÍA SER MÁS RESTRINGIDO
@Tag(name = "Puntos de mapa", description = "Consulta de los puntos de interés disponibles para visualizar en el mapa.")
public class MapPointController {

    private final MapPointService mapPointService;
    private final MapPointMapper mapPointMapper;
    private final UserActionService userActionService;


    @GetMapping
    @Operation(
            summary = "Listar todos los puntos de mapa",
            description = "Devuelve el conjunto de puntos de mapa preparado para mostrarse en la vista principal del frontend."
    )
    @ApiResponse(responseCode = "200", description = "Puntos obtenidos correctamente", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MapPointResponseDTO.class))))
    public ResponseEntity<List<MapPointResponseDTO>> getAllPoints() {
        List<MapPointResponseDTO> responseList= mapPointMapper.toResponseList(mapPointService.getAllPointsForMap());
        return ResponseEntity.ok(responseList);
    }


    @GetMapping("/{id}")
    @Operation(
            summary = "Obtener un punto de mapa por ID",
            description = "Devuelve el detalle completo del punto de mapa indicado por su identificador numérico."
    )
    @ApiResponse(responseCode = "200", description = "Punto obtenido correctamente", content = @Content(schema = @Schema(implementation = MapPointDetailResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "ID inválido o tipo de parámetro incorrecto", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El punto de mapa no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<MapPointDetailResponseDTO> getPointById(@Parameter(description = "ID numérico del punto de mapa", example = "1") @PathVariable Long id) {
        return mapPointService.getPointById(id)
                .map(mapPointMapper::toDetailResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/actions")
    public ResponseEntity<UserActionResponseDTO> performAction(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id,
            @Valid @RequestBody UserActionRequestDTO request) {

        // Extraemos el email del token de seguridad
        String email = jwt.getSubject();

        // Llamamos a nuestro servicio y le pasamos la pelota
        UserActionResponseDTO response =
                userActionService.processAction(email, id, request);

        return ResponseEntity.ok(response);
    }

        @GetMapping("/{id}/actions/status")
        public ResponseEntity<com.esplai.backendgogomap.models.dtos.response.UserActionStatusResponseDTO> actionStatus(
                        @AuthenticationPrincipal Jwt jwt,
                        @PathVariable Long id,
                        @RequestParam(name = "actionType", required = true) String actionTypeStr
        ) {
                String email = jwt.getSubject();
                com.esplai.backendgogomap.models.enums.ActionType actionType = com.esplai.backendgogomap.models.enums.ActionType.valueOf(actionTypeStr);
                boolean has = userActionService.hasPerformedAction(email, id, actionType);
                return ResponseEntity.ok(new com.esplai.backendgogomap.models.dtos.response.UserActionStatusResponseDTO(has));
        }
}
// add comentario de Nayla para hacer un commit para poder aparecer el proyecto de GoGoMap en mi perfil