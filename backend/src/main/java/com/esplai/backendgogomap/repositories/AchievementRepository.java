package com.esplai.backendgogomap.repositories;

import com.esplai.backendgogomap.models.entities.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
