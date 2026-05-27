package com.esplai.backendgogomap.models.entities;

import com.esplai.backendgogomap.models.enums.ActionType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_point_actions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPointAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    // Relación: Muchas "Acciones" pertenecen a un "Usuario"
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Relación: Muchas "Acciones" se hacen sobre un "Punto del Mapa"
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "map_point_id", nullable = false)
    private MapPoint mapPoint;  // Guardamos el tipo de acción (VISIT o REPORT) como un String en la BD
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActionType actionType;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}