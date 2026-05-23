package com.esplai.backendgogomap.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "map_points")
@Data
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

    @Column(nullable = false,name="ods_id")
    private Long odsId;

    @Column(name="reported_by")
    private Long reportedBy;

}