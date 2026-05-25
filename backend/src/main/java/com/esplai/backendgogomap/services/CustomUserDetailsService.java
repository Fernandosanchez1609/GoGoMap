package com.esplai.backendgogomap.services;

import com.esplai.backendgogomap.models.entities.User;
import com.esplai.backendgogomap.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("No se ha encontrado el usuario con email: " + email));

        // Traducimos nuestro User al User de Spring Security
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .disabled(!user.isActivo())
                .authorities(
                        user.getRoles()
                                .stream()
                                .map(Enum::name)
                                .toArray(String[]::new)
                )
                .build();
    }
}