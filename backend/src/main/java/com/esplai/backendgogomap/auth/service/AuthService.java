package com.esplai.backendgogomap.auth.service;

import com.esplai.backendgogomap.auth.dto.AuthResponse;
import com.esplai.backendgogomap.auth.dto.LoginRequest;
import com.esplai.backendgogomap.auth.dto.RegisterRequest;
import com.esplai.backendgogomap.service.JwtService; // El servicio de tokens que creaste antes
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    // TODO: Inyectar UserRepository cuando esté creado
    // private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    // TODO: Inyectar UserMapper (con MapStruct) cuando esté creado para mapear la entidad al DTO
    // private final UserMapper userMapper;

    public AuthResponse register(RegisterRequest request) {
        // TODO: 1. Comprobar si el email ya existe en BD (repository.existsByEmail)
        // TODO: 2. Crear la entidad User (encriptando la contraseña: passwordEncoder.encode(request.getPassword()))
        // TODO: 3. Guardar el User en BD (repository.save)
        // TODO: 4. Generar el token (jwtService.generarToken(user))
        // TODO: 5. Devolver el AuthResponse

        return new AuthResponse("token-simulado-registro", "Bearer");
    }

    public AuthResponse login(LoginRequest request) {
        // 1. Spring Security comprueba que el email y la contraseña coinciden
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // TODO: 2. Buscar el User en la BD (repository.findByEmail)
        // TODO: 3. Generar el token (jwtService.generarToken(user))
        // TODO: 4. Devolver el AuthResponse

        return new AuthResponse("token-simulado-login", "Bearer");
    }
}