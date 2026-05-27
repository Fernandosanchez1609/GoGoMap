package com.esplai.backendgogomap.services;

import com.esplai.backendgogomap.exceptions.ResourceNotFoundException;
import com.esplai.backendgogomap.models.dtos.request.UserActionRequestDTO;
import com.esplai.backendgogomap.models.dtos.response.UserActionResponseDTO;
import com.esplai.backendgogomap.models.entities.KarmaEvent;
import com.esplai.backendgogomap.models.entities.MapPoint;
import com.esplai.backendgogomap.models.entities.User;
import com.esplai.backendgogomap.models.entities.UserPointAction;
import com.esplai.backendgogomap.repositories.KarmaEventRepository;
import com.esplai.backendgogomap.repositories.MapPointRepository;
import com.esplai.backendgogomap.repositories.UserPointActionRepository;
import com.esplai.backendgogomap.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserActionService {
    // Inyectamos todos los repositorios que necesitamos
    private final UserRepository userRepository;
    private final MapPointRepository mapPointRepository;
    private final UserPointActionRepository userPointActionRepository;
    private final KarmaEventRepository karmaEventRepository;

    // @Transactional es VITAL. Si algo falla a mitad (ej. se guarda la acción pero no el karma),
    // Spring deshace todo automáticamente para no dejar la base de datos corrupta.
    @Transactional
    public UserActionResponseDTO processAction(String email, Long
            pointId, UserActionRequestDTO request) {

        // 1. Buscamos al usuario y al punto (si no existen, salta nuestro Error 404 global)
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new
                        ResourceNotFoundException("Usuario", "email", email));

        MapPoint point = mapPointRepository.findById(pointId)
                .orElseThrow(() -> new
                        ResourceNotFoundException("Punto de Mapa", pointId));
        // 2. Validación Anti-Trampas: Comprobamos si el usuario ya hizo esta acción en este punto
        boolean alreadyDidAction = userPointActionRepository
                .existsByUserAndMapPointAndActionType(user, point,
                        request.getActionType());

        if (alreadyDidAction) {
            // Si ya lo hizo, lanzamos un error (puedes crear una excepción personalizada luego,
            // pero por ahora un IllegalArgumentException servirá y devolverá un 400).
            throw new IllegalArgumentException("Ya has realizado la acción '" + request.getActionType() + "' en este punto.");
        }
        // 3. Guardamos la Interacción (Quién ha tocado qué)
        UserPointAction action = UserPointAction.builder()
                .user(user)
                .mapPoint(point)
                .actionType(request.getActionType())
                .build();
        userPointActionRepository.save(action);
        // 4. Calculamos y actualizamos el Karma
        int karmaEarned = request.getActionType().getPoints();

        // ¡ATENCIÓN! Asegúrate de que el atributo en la clase User se llama 'karmaPoints'.
                // Si se llama diferente (ej. karma_points), usa el getter / setter correcto aquí:
        int newTotal = user.getKarmaPoints() + karmaEarned;
        user.setKarmaPoints(newTotal);
        userRepository.save(user);
        // 5. Guardamos el historial (El "ticket" de los puntos)
        KarmaEvent karmaEvent = KarmaEvent.builder()
                .user(user)
                .pointsChange(karmaEarned)
                .reason(request.getActionType().getDescription())
                .build();
        karmaEventRepository.save(karmaEvent);
        // 6. Construimos y devolvemos el DTO de respuesta (Sin usar Mapper)
        return UserActionResponseDTO.builder()
                .action(request.getActionType())
                .karmaEarned(karmaEarned)
                .newTotalKarma(newTotal)
                .message("¡Genial! Has ganado " + karmaEarned + " puntos por tu aportación.")
                                .build();
    }
}
