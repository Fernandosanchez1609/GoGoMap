package com.esplai.backendgogomap.models.dtos.response;

import com.esplai.backendgogomap.models.enums.Ods;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapPointDetailResponseDTO {


    private Long id;
    private String title;
    private String description;
    private String address;
    private String status;
    private Ods ods;
    private int odsNumber;
    private Long reportedBy;
}