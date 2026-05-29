package com.esplai.backendgogomap.repositories;

import com.esplai.backendgogomap.models.entities.MapPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapPointRepository extends JpaRepository<MapPoint, Long> {
}
