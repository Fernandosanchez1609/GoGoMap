package com.esplai.backendgogomap.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchievementResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String iconName;
    private int requiredKarma;
    private boolean unlocked;
}
