package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.exceptions.BaseException;
import com.github.genraven.genesys.mapper.ErrorResponseMapper;
import com.github.genraven.genesys.mapper.PlayerResponseMapper;
import reactor.core.publisher.Mono;

public class MapperUtil {

    private static final PlayerResponseMapper playerResponseMapper = PlayerResponseMapper.INSTANCE;
    private static final ErrorResponseMapper errorResponseMapper = ErrorResponseMapper.INSTANCE;

    public static Mono<PlayerResponse> mapPlayerToResponse(final Player player) {
        return Mono.just(playerResponseMapper.mapPlayerToPlayerResponse(player));
    }

    public static Mono<PlayerResponse> mapErrorsToPlayerResponse(final BaseException exception) {
        return Mono.just(errorResponseMapper.mapErrorsToPlayerResponse(exception));
    }
}
