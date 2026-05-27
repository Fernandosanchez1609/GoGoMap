package com.esplai.backendgogomap.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WheelSpinResponseDTO {
    private int slotIndex;
    private String multiplier;
    private int karmaEarned;
    private int newTotalKarma;
    private String message;
}
