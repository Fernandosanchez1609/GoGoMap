package com.esplai.backendgogomap.auth.controller;

import com.esplai.backendgogomap.auth.dto.AuthResponse;
import com.esplai.backendgogomap.auth.dto.LoginRequest;
import com.esplai.backendgogomap.auth.dto.RegisterRequest;
import com.esplai.backendgogomap.auth.service.AuthService;
import com.esplai.backendgogomap.exceptions.dto.ApiErrorResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Operaciones para registrar usuarios e iniciar sesión en la aplicación.")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(
            summary = "Registrar un nuevo usuario",
            description = "Crea una cuenta nueva con los datos enviados y devuelve un token JWT junto con su tipo."
    )
    @ApiResponse(responseCode = "200", description = "Usuario registrado correctamente", content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    @ApiResponse(responseCode = "400", description = "Datos de registro inválidos o JSON mal formado", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "409", description = "El email ya está registrado", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(
            summary = "Iniciar sesión",
            description = "Autentica las credenciales proporcionadas y devuelve un token JWT válido para consumir los endpoints protegidos."
    )
    @ApiResponse(responseCode = "200", description = "Inicio de sesión correcto", content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    @ApiResponse(responseCode = "400", description = "Datos de login inválidos o JSON mal formado", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

}