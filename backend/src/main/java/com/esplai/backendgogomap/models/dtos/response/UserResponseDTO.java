package com.esplai.backendgogomap.models.dtos.response;

import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private boolean activo;
    private Set<String> roles;
}