package com.esplai.backendgogomap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Configuration
public class JwtKeyConfig {

    @Bean
    SecretKey jwtSecretKey(@Value("${JWT_SECRET}") String secret) {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalArgumentException("La clave JWT debe tener al menos 32 bytes para HS256");
        }
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}