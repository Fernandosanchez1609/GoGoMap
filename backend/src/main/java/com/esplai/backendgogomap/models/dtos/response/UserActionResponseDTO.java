package com.esplai.backendgogomap.models.dtos.response;

import com.esplai.backendgogomap.models.enums.ActionType;
import lombok.AllArgsConstructor; import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UserActionResponseDTO {
    private ActionType action;
    private int karmaEarned; // Cuánto karma ha ganado en esta acción (ej. 5 o 10)
    private int newTotalKarma; //El total acumulado que tiene ahora el usuario
    private String message; // Un mensaje amigable (ej. "¡Hasganado 5 puntos por visitar!")
}
