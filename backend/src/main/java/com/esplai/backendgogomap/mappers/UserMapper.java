package com.esplai.backendgogomap.mappers;

import com.esplai.backendgogomap.models.dtos.response.UserResponseDTO;
import com.esplai.backendgogomap.models.entities.User;
import org.mapstruct.Mapper;

// componentModel = "spring" permite inyectarlo luego con @RequiredArgsConstructor
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toResponse(User user);

}