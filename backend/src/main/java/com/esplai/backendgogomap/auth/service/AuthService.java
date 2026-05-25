package com.esplai.backendgogomap.auth.service;

import com.esplai.backendgogomap.auth.dto.AuthResponse;
import com.esplai.backendgogomap.auth.dto.LoginRequest;
import com.esplai.backendgogomap.auth.dto.RegisterRequest;
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


    public AuthResponse register(RegisterRequest request) {
//
//        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
//            throw new IllegalArgumentException("El email ya está registrado");
//
//            // TODO: Crear la entidad User (encriptando la contraseña: passwordEncoder.encode(request.getPassword()))
//            User user = new User();
//            user.setPassword(passwordEncoder.encode(request.getPassword()));
//            // ... setear resto de campos .
//            userRepository.save(user);
//            String token = jwtService.generarToken(user);
//            return new AuthResponse(token, "Bearer");

        // TODO: Borrar cuando este User creado
        return new AuthResponse("token-simulado", "Bearer");
    }

    public AuthResponse login(LoginRequest request) {
        // 1. Spring Security comprueba que el email y la contraseña coinciden
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // TODO: 3. Descomentar cuando exista UserRepository y User
        /*
        User user = userRepository.findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email o contraseña incorrectos"));

        String token = jwtService.generarToken(user);
        return new AuthResponse(token, "Bearer");
        */

        return new AuthResponse("token-simulado-login", "Bearer");
    }
}