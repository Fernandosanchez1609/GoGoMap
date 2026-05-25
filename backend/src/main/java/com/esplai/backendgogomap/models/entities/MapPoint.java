package com.esplai.backendgogomap.models.entities;

import com.esplai.backendgogomap.models.enums.Ods;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "map_points")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MapPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String address;


    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;


    private String status;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="last_verified_at")
    private LocalDateTime lastVerifiedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "ods")
    private Ods ods;

    @Column(name="reported_by")
    private Long reportedBy;

}