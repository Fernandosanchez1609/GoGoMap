package com.esplai.backendgogomap.models.entities;

import com.esplai.backendgogomap.models.entities.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "karma_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class KarmaEvent {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int pointsChange;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createAt;

    @PrePersist
    protected void onCreate(){
        this.createAt = LocalDateTime.now();
    }
}
