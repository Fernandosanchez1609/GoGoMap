package com.esplai.backendgogomap.services;

import com.esplai.backendgogomap.exceptions.DailyWheelSpinLimitExceededException;
import com.esplai.backendgogomap.exceptions.ResourceNotFoundException;
import com.esplai.backendgogomap.mappers.MapPointMapper;
import com.esplai.backendgogomap.mappers.UserMapper;
import com.esplai.backendgogomap.models.dtos.request.UpdateProfileRequestDTO;
import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserRankingDTO;
import com.esplai.backendgogomap.models.dtos.response.AchievementResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.RewardResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.WheelSpinResponseDTO;
import com.esplai.backendgogomap.models.entities.KarmaEvent;
import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.models.entities.Achievement;
import com.esplai.backendgogomap.models.entities.Reward;
import com.esplai.backendgogomap.models.entities.User;
import com.esplai.backendgogomap.repositories.KarmaEventRepository;
import com.esplai.backendgogomap.repositories.MapPointRepository;
import com.esplai.backendgogomap.repositories.AchievementRepository;
import com.esplai.backendgogomap.repositories.RewardRepository;
import com.esplai.backendgogomap.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private static final int[] WHEEL_POINTS = {1, 1, 2, 2, 1, 5, 1, 2, 1, 5, 1, 2, 1, 5, 1, 10};
    private static final String[] WHEEL_MULTIPLIERS = {
            "X1", "X1", "X2", "X2", "X1", "X5", "X1", "X2",
            "X1", "X5", "X1", "X2", "X1", "X5", "X1", "X10"
    };

    private final UserRepository userRepository;
    private final MapPointRepository mapPointRepository;
    private final KarmaEventRepository karmaEventRepository;
    private final AchievementRepository achievementRepository;
    private final RewardRepository rewardRepository;
    private final UserMapper userMapper;
    private final MapPointMapper mapPointMapper;

    public UserResponseDTO obtenerPerfilPorEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));

        return userMapper.toResponse(user);
    }

    @Transactional
    public void addFavorite(String email, Long pointId) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));

        MapPoint point = mapPointRepository.findById(pointId)
                .orElseThrow(() -> new ResourceNotFoundException("Punto de Mapa", pointId));
        user.getFavoritos().add(point);

        userRepository.save(user);

    }

    @Transactional
    public void removeFavorite(String email, Long pointId) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() ->  new ResourceNotFoundException("Usuario", "email", email));

        user.getFavoritos().removeIf(point -> point.getId().equals(pointId));
        userRepository.save(user);
    }

    public List<MapPointResponseDTO> getFavorites(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));

        // Convertimos el Set<MapPoint> a una lista de DTOs para que el frontend lo reciba limpio
        return user.getFavoritos().stream()
                .map(mapPointMapper::toResponse)
                .toList();
    }

    public boolean hasSpunDailyWheel(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));

        return user.getLastWheelSpin() != null && user.getLastWheelSpin().toLocalDate().isEqual(LocalDate.now());
    }

    @Transactional
    public WheelSpinResponseDTO spinDailyWheel(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));

        LocalDate today = LocalDate.now();
        if (user.getLastWheelSpin() != null && user.getLastWheelSpin().toLocalDate().isEqual(today)) {
            throw new DailyWheelSpinLimitExceededException("Ya has utilizado la ruleta hoy. Vuelve a intentarlo mañana.");
        }

        int slotIndex = ThreadLocalRandom.current().nextInt(0, WHEEL_POINTS.length);
        int karmaEarned = WHEEL_POINTS[slotIndex];
        int newTotal = user.getKarmaPoints() + karmaEarned;
        user.setKarmaPoints(newTotal);
        user.setLastWheelSpin(LocalDateTime.now());
        userRepository.save(user);

        KarmaEvent karmaEvent = KarmaEvent.builder()
                .user(user)
                .pointsChange(karmaEarned)
                .reason("Ruleta diaria")
                .build();
        karmaEventRepository.save(karmaEvent);

        return WheelSpinResponseDTO.builder()
                .slotIndex(slotIndex)
                .multiplier(WHEEL_MULTIPLIERS[slotIndex])
                .karmaEarned(karmaEarned)
                .newTotalKarma(newTotal)
                .message("Has ganado " + karmaEarned + " puntos de karma en la ruleta diaria.")
                .build();
    }

    public List<UserRankingDTO> getTopKarmaUsers() {
        List<User> topUsers = userRepository.findTop10ByOrderByKarmaPointsDesc();
        return topUsers.stream()
                .map(user -> UserRankingDTO.builder()
                        .username(user.getNombre() + " " + user.getApellidos().charAt(0) + ".")
                        .karmaPoints(user.getKarmaPoints())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponseDTO updateUserProfile(String email, UpdateProfileRequestDTO request) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        // Verificar si el nuevo email ya está en uso por otro usuario
        if (!user.getEmail().equalsIgnoreCase(request.getEmail())) {
            if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
                throw new IllegalArgumentException("El email ya está en uso por otro usuario");
            }
        }

        // Actualizar campos
        user.setNombre(request.getNombre());
        user.setApellidos(request.getApellidos());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);
        return userMapper.toResponseDTO(updatedUser);
    }

    public List<AchievementResponseDTO> getUserAchievements(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        List<Achievement> allAchievements = achievementRepository.findAll();
        int userKarma = user.getKarmaPoints();

        return allAchievements.stream()
                .map(achievement -> AchievementResponseDTO.builder()
                        .id(achievement.getId())
                        .title(achievement.getTitle())
                        .description(achievement.getDescription())
                        .iconName(achievement.getIconName())
                        .requiredKarma(achievement.getRequiredKarma())
                        .unlocked(userKarma >= achievement.getRequiredKarma())
                        .build())
                .collect(Collectors.toList());
    }

    public List<RewardResponseDTO> getUserRewards(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        List<Reward> allRewards = rewardRepository.findAll();
        Set<Long> ownedIds = user.getUnlockedRewards().stream()
                .map(Reward::getId)
                .collect(Collectors.toSet());

        return allRewards.stream()
                .map(r -> RewardResponseDTO.builder()
                        .id(r.getId())
                        .name(r.getName())
                        .description(r.getDescription())
                        .cost(r.getCost())
                        .iconName(r.getIconName())
                        .isOwned(ownedIds.contains(r.getId()))
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponseDTO buyReward(String email, Long rewardId) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new ResourceNotFoundException("Reward", "id", rewardId));

        if (user.getUnlockedRewards().contains(reward)) {
            throw new IllegalArgumentException("Ya posees esta recompensa");
        }

        if (user.getKarmaPoints() < reward.getCost()) {
            throw new IllegalArgumentException("Karma insuficiente");
        }

        user.setKarmaPoints(user.getKarmaPoints() - reward.getCost());
        user.getUnlockedRewards().add(reward);

        KarmaEvent event = KarmaEvent.builder()
                .user(user)
                .pointsChange(-reward.getCost())
                .reason("Compra: " + reward.getName())
                .build();
        karmaEventRepository.save(event);

        User updated = userRepository.save(user);
        return userMapper.toResponseDTO(updated);
    }
}