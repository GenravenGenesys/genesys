package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.exceptions.BaseException;
import com.github.genraven.genesys.mapper.ErrorResponseMapper;
import com.github.genraven.genesys.mapper.PlayerResponseMapper;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public class MapperUtil {

    private static final PlayerResponseMapper playerResponseMapper = PlayerResponseMapper.INSTANCE;
    private static final ErrorResponseMapper errorResponseMapper = ErrorResponseMapper.INSTANCE;

    public static Mono<Player> mapPlayerToResponse(final Player player) {
        log.info("Mapping Player: {}", player.getName());
        return Mono.just(playerResponseMapper.mapPlayerToPlayerResponse(player));
    }

    public static Mono<Player> mapErrorsToPlayerResponse(final BaseException exception) {
        log.info("Mapping Error: {}", exception.getMessage());
        return Mono.just(errorResponseMapper.mapErrorsToPlayerResponse(exception));
    }
}
