package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.service.ModifierService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class ModifierHandler {

    private final ModifierService modifierService;

    public Mono<ServerResponse> getModifiers(final ServerRequest serverRequest) {
        return modifierService.getModifiers().collectList().flatMap(modifierTypes -> {
            if (modifierTypes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(modifierTypes));
        });
    }
}
