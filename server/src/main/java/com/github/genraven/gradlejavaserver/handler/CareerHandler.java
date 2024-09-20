package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.actor.player.Career;
import com.github.genraven.gradlejavaserver.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.gradlejavaserver.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class CareerHandler {
    private final CareerService careerService;

    @Autowired
    public CareerHandler(final CareerService careerService) {
        this.careerService = careerService;
    }

    public Mono<ServerResponse> getAllCareers(final ServerRequest serverRequest) {
        return careerService.getAllCareers().collectList().flatMap(careers -> {
            if(careers.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(careers));
        });
    }

    public Mono<ServerResponse> getCareer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return careerService.getCareer(name)
                .flatMap(career -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(career))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createCareer(final ServerRequest serverRequest) {
        return careerService.createCareer(serverRequest.pathVariable(NAME))
                .flatMap(career -> ServerResponse.created(getURI(career)).bodyValue(career));
    }

    public Mono<ServerResponse> updateCareer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Career> careerMono = serverRequest.bodyToMono(Career.class);
        return careerMono
                .flatMap(career -> careerService.updateCareer(name, career))
                .flatMap(career -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(career))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Career career) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(career.getName()).toUri();
    }
}
