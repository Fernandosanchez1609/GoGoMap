package com.esplai.backendgogomap.controllers;


import com.esplai.backendgogomap.mappers.MapPointMapper;
import com.esplai.backendgogomap.models.dtos.request.UserActionRequestDTO;
import com.esplai.backendgogomap.models.dtos.response.MapPointDetailResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserActionResponseDTO;
import com.esplai.backendgogomap.services.MapPointService;
import com.esplai.backendgogomap.services.UserActionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/points")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") //SOLO EN DESARROLLO, EN PRODUCCIÓN DEBERÍA SER MÁS RESTRINGIDO
public class MapPointController {

    private final MapPointService mapPointService;
    private final MapPointMapper mapPointMapper;
    private final UserActionService userActionService;


    @GetMapping
    public ResponseEntity<List<MapPointResponseDTO>> getAllPoints() {
        List<MapPointResponseDTO> responseList= mapPointMapper.toResponseList(mapPointService.getAllPointsForMap());
        return ResponseEntity.ok(responseList);
    }


    @GetMapping("/{id}")
    public ResponseEntity<MapPointDetailResponseDTO> getPointById(@PathVariable Long id) {
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
}
