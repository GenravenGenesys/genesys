package com.github.genraven.genesys.handler;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.service.ArchetypeService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class ArchetypeHandler extends BaseHandler {

    private final ArchetypeService archetypeService;

    public Mono<ServerResponse> getAllArchetypes(final ServerRequest serverRequest) {
        return archetypeService.getAllArchetypes().collectList().flatMap(archetypes -> {
            if (archetypes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(archetypes));
        });
    }

    public Mono<ServerResponse> getArchetype(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return archetypeService.getArchetype(name)
                .flatMap(archetype -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(archetype))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createArchetype(final ServerRequest serverRequest) {
        return archetypeService.createArchetype(serverRequest.pathVariable(NAME))
                .flatMap(archetype -> ServerResponse.created(getURI(archetype.getName())).bodyValue(archetype));
    }

    public Mono<ServerResponse> updateArchetype(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Archetype> archetypeMono = serverRequest.bodyToMono(Archetype.class);
        return archetypeMono
                .flatMap(archetype -> archetypeService.updateArchetype(name, archetype))
                .flatMap(archetype -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(archetype))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
