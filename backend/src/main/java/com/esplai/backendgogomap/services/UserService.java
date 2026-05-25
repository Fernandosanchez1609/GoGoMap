package com.esplai.backendgogomap.services;

import com.esplai.backendgogomap.mappers.MapPointMapper;
import com.esplai.backendgogomap.mappers.UserMapper;
import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserResponseDTO;
import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.models.entities.User;
import com.esplai.backendgogomap.repositories.MapPointRepository;
import com.esplai.backendgogomap.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MapPointRepository mapPointRepository;
    private final UserMapper userMapper;
    private final MapPointMapper mapPointMapper;

    public UserResponseDTO obtenerPerfilPorEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el email: " + email));

        return userMapper.toResponse(user);
    }

    @Transactional
    public void addFavorite(String email, Long pointId) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        MapPoint point = mapPointRepository.findById(pointId)
                .orElseThrow(() -> new IllegalArgumentException("Punto no encontrado"));

        boolean añadido = user.getFavoritos().add(point);


        userRepository.save(user);

    }

    @Transactional
    public void removeFavorite(String email, Long pointId) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        user.getFavoritos().removeIf(point -> point.getId().equals(pointId));
        userRepository.save(user);
    }

    public List<MapPointResponseDTO> getFavorites(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Convertimos el Set<MapPoint> a una lista de DTOs para que el frontend lo reciba limpio
        return user.getFavoritos().stream()
                .map(mapPointMapper::toResponse)
                .toList();
    }
}