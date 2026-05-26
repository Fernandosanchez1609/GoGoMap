package com.esplai.backendgogomap.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    // Ejemplo de uso: new ResourceNotFoundException("Usuario", "email", "juan@test.com")
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s no encontrado con %s: '%s'", resourceName, fieldName, fieldValue));
    }

    // Ejemplo de uso: new ResourceNotFoundException("Punto de mapa", 1L)
    public ResourceNotFoundException(String resourceName, Object identifier) {
        super(String.format("%s no encontrado con identificador: '%s'", resourceName, identifier));
    }
}