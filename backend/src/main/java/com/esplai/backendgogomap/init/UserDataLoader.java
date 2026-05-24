package com.esplai.backendgogomap.init;

import com.esplai.backendgogomap.models.entities.User;
import com.esplai.backendgogomap.models.enums.Role;
import com.esplai.backendgogomap.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class UserDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Comprobamos si ya hay usuarios para no duplicarlos cada vez que arranca el servidor
        if (userRepository.count() == 0) {

            // Instanciamos el encriptador manualmente para esta rama
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            User admin = User.builder()
                    .nombre("Admin")
                    .apellidos("GoGoMap")
                    .email("admin@gogomap.com")
                    .password(passwordEncoder.encode("admin1234"))
                    .roles(Set.of(Role.ADMIN, Role.USER)) // El admin tiene ambos roles
                    .activo(true)
                    .build();

            User user = User.builder()
                    .nombre("Usuario")
                    .apellidos("Estándar")
                    .email("user@gogomap.com")
                    .password(passwordEncoder.encode("user1234"))
                    .roles(Set.of(Role.USER))
                    .activo(true)
                    .build();

            userRepository.saveAll(List.of(admin, user));

            System.out.println("✅ Usuarios de prueba (Admin y User) creados con éxito.");
        }
    }
}