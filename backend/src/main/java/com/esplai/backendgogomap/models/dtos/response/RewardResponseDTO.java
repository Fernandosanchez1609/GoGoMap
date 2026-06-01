package com.esplai.backendgogomap.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RewardResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int cost;
    private String iconName;
    private boolean isOwned;
}
