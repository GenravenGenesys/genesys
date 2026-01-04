package com.github.genraven.genesys.mapper;

import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.exceptions.BaseException;
import org.mapstruct.factory.Mappers;

public interface ErrorResponseMapper {

    ErrorResponseMapper INSTANCE = Mappers.getMapper(ErrorResponseMapper.class);

    PlayerResponse mapErrorsToPlayerResponse(final BaseException exception);
}
