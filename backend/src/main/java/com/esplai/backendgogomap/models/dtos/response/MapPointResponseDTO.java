package com.esplai.backendgogomap.models.dtos.response;

import com.esplai.backendgogomap.models.enums.Ods;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapPointResponseDTO {

    private Long id;
    private String title;
    private Double latitude;
    private Double longitude;
    private Ods ods;
    private int odsNumber;

}