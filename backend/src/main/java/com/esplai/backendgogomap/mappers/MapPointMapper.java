package com.esplai.backendgogomap.mappers;


import com.esplai.backendgogomap.models.dtos.response.MapPointDetailResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.entities.MapPoint;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapPointMapper {


    public MapPointResponseDTO toResponse(MapPoint point) {
        return new MapPointResponseDTO(
                point.getId(),
                point.getTitle(),
                point.getLatitude(),
                point.getLongitude()
        );
    }


    public List<MapPointResponseDTO> toResponseList(List<MapPoint> points) {
        return points.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public MapPointDetailResponseDTO toDetailResponse (MapPoint point) {
        return new MapPointDetailResponseDTO(
                point.getId(),
                point.getTitle(),
                point.getDescription(),
                point.getAddress(),
                point.getStatus(),
                point.getOdsId(),
                point.getReportedBy()

        );
    }
}