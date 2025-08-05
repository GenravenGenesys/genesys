package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.PlayerResponse;
import com.github.genraven.genesys.mapper.PlayerResponseMapper;
import reactor.core.publisher.Mono;

public class MapperUtil {

    private static final PlayerResponseMapper playerResponseMapper = PlayerResponseMapper.INSTANCE;

    public static Mono<PlayerResponse> mapPlayerToResponse(final Player player) {
        return Mono.just(playerResponseMapper.mapPlayerToPlayerResponse(player));
    }
}
