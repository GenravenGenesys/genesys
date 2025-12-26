package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.equipment.Gear;
import com.github.genraven.genesys.service.equipment.GearService;

import com.github.genraven.genesys.validator.equipment.GearValidator;
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
public class EquipmentHandler extends BaseHandler {

    private final GearService gearService;
    private final GearValidator gearValidator;

    public Mono<ServerResponse> getAllGears(final ServerRequest serverRequest) {
        return gearService.getAllGears().collectList().flatMap(gears -> {
            if (gears.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(gears));
        });
    }

    public Mono<ServerResponse> createGear(final ServerRequest serverRequest) {
        return gearService.createGear(serverRequest.pathVariable(NAME))
                .flatMap(gear -> ServerResponse.created(getURI(gear.getName()))
                        .bodyValue(gear));
    }

    public Mono<ServerResponse> getGear(final ServerRequest serverRequest) {
        return gearService.getGear(serverRequest.pathVariable(NAME))
                .flatMap(gear -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(gear))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateGear(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Gear.class)
                .flatMap(gear -> gearService.updateGear(serverRequest.pathVariable(NAME), gear))
                .flatMap(gear -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(gear))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
