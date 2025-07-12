package com.github.genraven.genesys.handler;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.service.CharacterService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class CharacterHandler {

    private final CharacterService characterService;

    public Mono<ServerResponse> getPlayer(final ServerRequest request) {
        final Flux<Player> players = request.bodyToFlux(Player.class);
        return players
                .flatMap(characterService::mapPlayerToCharacter)
                .collectList()
                .flatMap(characters -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(characters)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }
}
