package com.esplai.backendgogomap.repositories;

import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.models.entities.User;
import com.esplai.backendgogomap.models.entities.UserPointAction;
import com.esplai.backendgogomap.models.enums.ActionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPointActionRepository extends
        JpaRepository<UserPointAction, Long> {
    // Este método lo creamos nosotros. Spring Boot es tan listo que, solo con leer el nombre
    // del método (existsBy...), construirá la consulta SQL por debajo automáticamente.
    // Lo usaremos para evitar que un usuario "visite" o "reporte" el mismo punto 20 veces para farmear puntos.
    boolean existsByUserAndMapPointAndActionType(User user,
                                                 MapPoint mapPoint, ActionType actionType);
}
