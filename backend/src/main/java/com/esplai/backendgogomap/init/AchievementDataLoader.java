package com.esplai.backendgogomap.init;

import com.esplai.backendgogomap.models.entities.Achievement;
import com.esplai.backendgogomap.repositories.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AchievementDataLoader implements CommandLineRunner {

    private final AchievementRepository achievementRepository;

    @Override
    public void run(String... args) throws Exception {
        if (achievementRepository.count() == 0) {
            achievementRepository.save(Achievement.builder()
                    .title("Pionero")
                    .description("Regístrate en GoGoMap")
                    .iconName("MapPin")
                    .requiredKarma(0)
                    .build());

            achievementRepository.save(Achievement.builder()
                    .title("Explorador")
                    .description("Consigue 50 puntos Karma")
                    .iconName("Compass")
                    .requiredKarma(50)
                    .build());

            achievementRepository.save(Achievement.builder()
                    .title("Buen Ciudadano")
                    .description("Consigue 150 puntos Karma")
                    .iconName("Heart")
                    .requiredKarma(150)
                    .build());

            achievementRepository.save(Achievement.builder()
                    .title("Héroe Local")
                    .description("Consigue 500 puntos Karma")
                    .iconName("Trophy")
                    .requiredKarma(500)
                    .build());

            System.out.println("✅ Logros inicializados correctamente");
        }
    }
}
