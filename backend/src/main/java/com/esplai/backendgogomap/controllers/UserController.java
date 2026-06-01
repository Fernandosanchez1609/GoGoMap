package com.esplai.backendgogomap.controllers;

import com.esplai.backendgogomap.models.dtos.response.MapPointResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.UserRankingDTO;
import com.esplai.backendgogomap.models.dtos.response.WheelSpinResponseDTO;
import com.esplai.backendgogomap.models.dtos.response.WheelSpinStatusResponseDTO;
import com.esplai.backendgogomap.services.UserService;
import com.esplai.backendgogomap.exceptions.dto.ApiErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt; // ¡Importante usar este Jwt!
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Gestión del perfil autenticado y de los favoritos del usuario conectado.")
public class UserController {

    private final UserService userService;


    @GetMapping("/me")
    @Operation(
            summary = "Obtener mi perfil",
            description = "Devuelve los datos del usuario autenticado a partir del JWT enviado en la petición."
    )
    @ApiResponse(responseCode = "200", description = "Perfil obtenido correctamente", content = @Content(schema = @Schema(implementation = UserResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Falta el token JWT o no es válido", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El usuario autenticado no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<UserResponseDTO> getMyProfile(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        UserResponseDTO profile = userService.obtenerPerfilPorEmail(email);
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/me/favorites/{pointId}")
    @Operation(
            summary = "Añadir un punto a favoritos",
            description = "Asocia el punto de mapa indicado a los favoritos del usuario autenticado."
    )
    @ApiResponse(responseCode = "200", description = "Favorito añadido correctamente")
    @ApiResponse(responseCode = "400", description = "ID del punto inválido o JSON mal formado", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "401", description = "Falta el token JWT o no es válido", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El usuario autenticado o el punto de mapa no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<Void> addFavorite(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @Parameter(description = "ID del punto de mapa a añadir a favoritos", example = "1") @PathVariable Long pointId) {
        String email = jwt.getSubject();
        userService.addFavorite(email, pointId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me/favorites/{pointId}")
    @Operation(
            summary = "Eliminar un punto de favoritos",
            description = "Desasocia el punto de mapa indicado de los favoritos del usuario autenticado."
    )
    @ApiResponse(responseCode = "204", description = "Favorito eliminado correctamente")
    @ApiResponse(responseCode = "400", description = "ID del punto inválido o JSON mal formado", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "401", description = "Falta el token JWT o no es válido", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El usuario autenticado no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<Void> removeFavorite(
            @Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt,
            @Parameter(description = "ID del punto de mapa a eliminar de favoritos", example = "1") @PathVariable Long pointId) {
        String email = jwt.getSubject();
        userService.removeFavorite(email, pointId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/favorites")
    @Operation(
            summary = "Obtener mis favoritos",
            description = "Devuelve la lista de puntos de mapa guardados como favoritos por el usuario autenticado."
    )
    @ApiResponse(responseCode = "200", description = "Favoritos obtenidos correctamente", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MapPointResponseDTO.class))))
    @ApiResponse(responseCode = "401", description = "Falta el token JWT o no es válido", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El usuario autenticado no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<List<MapPointResponseDTO>> getMyFavorites(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        return ResponseEntity.ok(userService.getFavorites(email));
    }

    @GetMapping("/me/wheel-spin/status")
    @Operation(
            summary = "Comprobar estado de la ruleta diaria",
            description = "Devuelve si el usuario autenticado ya ha girado la ruleta hoy."
    )
    @ApiResponse(responseCode = "200", description = "Estado de la ruleta obtenido correctamente", content = @Content(schema = @Schema(implementation = WheelSpinStatusResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Falta el token JWT o no es válido", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El usuario autenticado no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<WheelSpinStatusResponseDTO> getWheelSpinStatus(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        boolean spunToday = userService.hasSpunDailyWheel(email);
        return ResponseEntity.ok(WheelSpinStatusResponseDTO.builder().hasSpunToday(spunToday).build());
    }

    @PostMapping("/me/wheel-spin")
    @Operation(
            summary = "Girar la ruleta diaria",
            description = "Genera un valor aleatorio entre 1 y 16 para el usuario autenticado y añade ese valor a su karma. Solo puede usarse una vez por día."
    )
    @ApiResponse(responseCode = "200", description = "Ruleta girada correctamente", content = @Content(schema = @Schema(implementation = WheelSpinResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Falta el token JWT o no es válido", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "429", description = "La ruleta ya se ha utilizado hoy", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "404", description = "El usuario autenticado no existe", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    public ResponseEntity<WheelSpinResponseDTO> spinDailyWheel(@Parameter(hidden = true) @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        WheelSpinResponseDTO response = userService.spinDailyWheel(email);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/ranking")
    @Operation(
            summary = "Obtener clasificación de karma",
            description = "Devuelve el Top 10 de usuarios con más puntos de karma."
    )
    @ApiResponse(responseCode = "200", description = "Clasificación obtenida correctamente", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserRankingDTO.class))))
    public ResponseEntity<List<UserRankingDTO>> getLeaderboard() {
        List<UserRankingDTO> ranking = userService.getTopKarmaUsers();
        return ResponseEntity.ok(ranking);
    }
}
