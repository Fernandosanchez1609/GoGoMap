package com.esplai.backendgogomap.repositories;

import com.esplai.backendgogomap.models.entities.KarmaEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository

public interface KarmaEventRepository extends JpaRepository<KarmaEvent, Long> {
    // Al heredar de JpaRepository, ya tenemos gratis métodos como save(), findAll(), etc.
    // Por ahora no necesitamos escribir nada más aquí.
}
