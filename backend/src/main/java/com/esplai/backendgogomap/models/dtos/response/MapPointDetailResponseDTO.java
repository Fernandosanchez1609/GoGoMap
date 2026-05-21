package com.esplai.backendgogomap.models.dtos.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapPointDetailResponseDTO {

    @NotNull(message = "El ID no puede ser nulo")
    private Long id;

    @NotBlank(message = "El título no puede estar vacío")
    private String title;

    private String description;
    private String address;
    private String status;

    @NotNull(message = "El ODS es obligatorio")
    private Long odsId;

    private Long reportedBy;
}