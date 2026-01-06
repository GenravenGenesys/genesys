package com.github.genraven.genesys.util;

import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.exceptions.BaseException;
import com.github.genraven.genesys.mapper.*;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public class MapperUtil {

    private static final PlayerResponseMapper playerResponseMapper = PlayerResponseMapper.INSTANCE;
    private static final NemesisResponseMapper nemesisResponseMapper = NemesisResponseMapper.INSTANCE;
    private static final RivalResponseMapper rivalResponseMapper = RivalResponseMapper.INSTANCE;
    private static final MinionResponseMapper minionResponseMapper = MinionResponseMapper.INSTANCE;
    private static final ErrorResponseMapper errorResponseMapper = ErrorResponseMapper.INSTANCE;

    public static Mono<Player> mapPlayerToResponse(final Player player) {
        log.info("Mapping Player: {}", player.getName());
        return Mono.just(playerResponseMapper.mapPlayerToPlayerResponse(player));
    }

    public static Mono<Nemesis> mapNemesisToResponse(final Nemesis nemesis) {
        log.info("Mapping nemesis: {}", nemesis.getName());
        return Mono.just(nemesisResponseMapper.mapNemesisToNemesisResponse(nemesis));
    }

    public static Mono<Rival> mapRivalToResponse(final Rival rival) {
        log.info("Mapping rival: {}", rival.getName());
        return Mono.just(rivalResponseMapper.mapRivalToRivalResponse(rival));
    }

    public static Mono<Minion> mapMinionToResponse(final Minion minion) {
        log.info("Mapping minion: {}", minion.getName());
        return Mono.just(minionResponseMapper.mapMinionToMinionResponse(minion));
    }

    public static Mono<Player> mapErrorsToPlayerResponse(final BaseException exception) {
        log.info("Mapping Error: {}", exception.getMessage());
        return Mono.just(errorResponseMapper.mapErrorsToPlayerResponse(exception));
    }
}
