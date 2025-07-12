package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.service.InjuryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class InjuryHandler {

    private final InjuryService injuryService;

    public Mono<ServerResponse> getAllInjuries(final ServerRequest serverRequest) {
        return injuryService.getAllInjuries().collectList().flatMap(injuries -> {
            if(injuries.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(injuries));
        });
    }

    public Mono<ServerResponse> getInjury(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return injuryService.getInjury(name)
                .flatMap(injury -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(injury))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createInjury(final ServerRequest serverRequest) {
        return injuryService.createInjury(serverRequest.pathVariable(NAME))
                .flatMap(injury -> ServerResponse.created(getURI(injury)).bodyValue(injury));
    }

    public Mono<ServerResponse> updateInjury(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<CriticalInjury> criticalInjuryMono = serverRequest.bodyToMono(CriticalInjury.class);
        return criticalInjuryMono
                .flatMap(injury -> injuryService.updateInjury(name, injury))
                .flatMap(injury -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(injury))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final CriticalInjury injury) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(injury.getName()).toUri();
    }
}
