package com.esplai.backendgogomap.controllers;

import com.esplai.backendgogomap.models.dtos.response.UserResponseDTO;
import com.esplai.backendgogomap.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        // userDetails.getUsername() extrae el email del token de forma automática y segura
        UserResponseDTO profile = userService.obtenerPerfilPorEmail(userDetails.getUsername());
        return ResponseEntity.ok(profile);
    }
}