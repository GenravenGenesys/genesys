package com.github.genraven.genesys.mapper;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.exceptions.BaseException;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ErrorResponseMapper {

    ErrorResponseMapper INSTANCE = Mappers.getMapper(ErrorResponseMapper.class);

    Player mapErrorsToPlayerResponse(final BaseException exception);
}
