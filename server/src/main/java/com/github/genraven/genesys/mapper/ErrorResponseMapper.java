package com.github.genraven.genesys.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ErrorResponseMapper {

    ErrorResponseMapper INSTANCE = Mappers.getMapper(ErrorResponseMapper.class);
}
