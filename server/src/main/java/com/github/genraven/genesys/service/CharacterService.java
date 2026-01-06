package com.github.genraven.genesys.service;

import org.springframework.stereotype.Service;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.CharacterResponse;
import com.github.genraven.genesys.mapper.CharacterResponseMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterResponseMapper mapper = CharacterResponseMapper.INSTANCE;

    public Flux<CharacterResponse> mapPlayerToCharacter(final List<Player> players) {
        if (players == null || players.isEmpty()) {
            return Flux.empty();
        }
        return Flux.fromIterable(players).map(mapper::mapPlayerToCharacter);
    }
}
