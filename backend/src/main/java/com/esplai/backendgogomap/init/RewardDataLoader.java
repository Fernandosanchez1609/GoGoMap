package com.esplai.backendgogomap.init;

import com.esplai.backendgogomap.models.entities.Reward;
import com.esplai.backendgogomap.repositories.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(3)
@RequiredArgsConstructor
public class RewardDataLoader implements CommandLineRunner {

    private final RewardRepository rewardRepository;

    @Override
    public void run(String... args) throws Exception {
        if (rewardRepository.count() == 0) {
            rewardRepository.save(Reward.builder()
                    .name("Pin Dorado")
                    .description("Un pin exclusivo para los ciudadanos comprometidos")
                    .cost(500)
                    .iconName("Award")
                    .build());

            rewardRepository.save(Reward.builder()
                    .name("Marco Ecológico")
                    .description("Marco especial para tu perfil")
                    .cost(1000)
                    .iconName("Frame")
                    .build());

            rewardRepository.save(Reward.builder()
                    .name("Título: Guardián de Málaga")
                    .description("Título honorífico por tu contribución")
                    .cost(2000)
                    .iconName("Crown")
                    .build());

            System.out.println("✅ Recompensas inicializadas correctamente");
        }
    }
}
