package com.esplai.backendgogomap.controllers;

import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserResponseDTO;
import com.esplai.backendgogomap.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt; // ¡Importante usar este Jwt!
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMyProfile(@AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        UserResponseDTO profile = userService.obtenerPerfilPorEmail(email);
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/me/favorites/{pointId}")
    public ResponseEntity<Void> addFavorite(@AuthenticationPrincipal Jwt jwt, @PathVariable Long pointId) {
        String email = jwt.getSubject();
        userService.addFavorite(email, pointId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me/favorites/{pointId}")
    public ResponseEntity<Void> removeFavorite(@AuthenticationPrincipal Jwt jwt, @PathVariable Long pointId) {
        String email = jwt.getSubject();
        userService.removeFavorite(email, pointId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/favorites")
    public ResponseEntity<List<MapPointResponseDTO>> getMyFavorites(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        return ResponseEntity.ok(userService.getFavorites(email));
    }
}