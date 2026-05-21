package com.esplai.backendgogomap.services;

import org.springframework.stereotype.Service;

import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.repositories.MapPointRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MapPointService {

    private final MapPointRepository mapPointRepository;

    public List<MapPoint> getAllPointsForMap() {
        return mapPointRepository.findAll();
    }

    public Optional<MapPoint> getPointById(Long id) {
        return mapPointRepository.findById(id);
    }
}