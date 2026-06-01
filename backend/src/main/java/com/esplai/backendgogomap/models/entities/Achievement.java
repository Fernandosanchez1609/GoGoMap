package com.esplai.backendgogomap.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "achievements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(nullable = false, length = 255)
    private String description;
    
    @Column(nullable = false, length = 50)
    private String iconName;
    
    @Column(nullable = false)
    private int requiredKarma;
}
