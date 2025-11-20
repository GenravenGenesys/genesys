package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.motivation.Motivation;
import com.github.genraven.genesys.service.MotivationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class MotivationHandler extends BaseHandler {

    private final MotivationService motivationService;

    public Mono<ServerResponse> getAllMotivations(final ServerRequest serverRequest) {
        return motivationService.getAllMotivations().collectList().flatMap(motivations -> {
            if(motivations.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(motivations));
        });
    }

    public Mono<ServerResponse> getMotivation(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return motivationService.getMotivation(name)
            .flatMap(motivation -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(motivation))
                .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createMotivation(final ServerRequest serverRequest) {
        return motivationService.createMotivation(serverRequest.pathVariable(NAME))
            .flatMap(motivation -> ServerResponse.created(getURI(motivation.getName())).bodyValue(motivation));
    }

    public Mono<ServerResponse> updateMotivation(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Motivation> motivationMono = serverRequest.bodyToMono(Motivation.class);
        return motivationMono
            .flatMap(motivation -> motivationService.updateMotivation(name, motivation))
            .flatMap(motivation -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(motivation))
                .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
