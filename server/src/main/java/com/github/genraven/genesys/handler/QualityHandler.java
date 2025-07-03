package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.equipment.Quality;
import com.github.genraven.genesys.service.QualityService;

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
public class QualityHandler {

    private final QualityService qualityService;

    public Mono<ServerResponse> getAllQualities(final ServerRequest serverRequest) {
        return qualityService.getAllQualities().collectList().flatMap(qualities -> {
            if (qualities.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(qualities));
        });
    }

    public Mono<ServerResponse> getQuality(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return qualityService.getQuality(name)
                .flatMap(quality -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(quality))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createQuality(final ServerRequest serverRequest) {
        return qualityService.createQuality(serverRequest.pathVariable(NAME))
                .flatMap(quality -> ServerResponse.created(getURI(quality)).bodyValue(quality));
    }

    public Mono<ServerResponse> updateQuality(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Quality> qualityMono = serverRequest.bodyToMono(Quality.class);
        return qualityMono
                .flatMap(quality -> qualityService.updateQuality(name, quality))
                .flatMap(quality -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(quality))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Quality quality) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(quality.getName()).toUri();
    }
}
