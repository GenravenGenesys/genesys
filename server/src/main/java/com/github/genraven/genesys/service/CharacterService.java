package com.github.genraven.genesys.service;

import org.springframework.stereotype.Service;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.CharacterResponse;
import com.github.genraven.genesys.mapper.CharacterResponseMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterResponseMapper mapper = CharacterResponseMapper.INSTANCE;

    public Mono<CharacterResponse> mapPlayerToCharacter(final Player player) {
        return Mono.just(mapper.mapPlayerToCharacter(player));
    }
}
