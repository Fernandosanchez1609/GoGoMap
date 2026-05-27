package com.esplai.backendgogomap.models.dtos.request;

import com.esplai.backendgogomap.models.enums.ActionType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserActionRequestDTO {
    // Validamos que el frontend no nos mande este campo vacío
    @NotNull(message = "El tipo de acción es obligatorio")
    private ActionType actionType;
}
