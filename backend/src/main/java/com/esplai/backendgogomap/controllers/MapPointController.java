package com.esplai.backendgogomap.controllers;


import com.esplai.backendgogomap.mappers.MapPointMapper;
import com.esplai.backendgogomap.models.dto.response.MapPointDetailResponseDTO;
import com.esplai.backendgogomap.models.dto.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.services.MapPointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/points")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") //SOLO EN DESARROLLO, EN PRODUCCIÓN DEBERÍA SER MÁS RESTRINGIDO
public class MapPointController {

    private final MapPointService mapPointService;
    private final MapPointMapper mapPointMapper;


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
}