package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.lore.Lore;
import com.github.genraven.genesys.domain.lore.Organization;
import com.github.genraven.genesys.service.lore.LoreService;
import com.github.genraven.genesys.service.lore.OrganizationService;

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
public class LoreHandler {

    private final LoreService loreService;
    private final OrganizationService organizationService;

    public Mono<ServerResponse> getAllLore(final ServerRequest serverRequest) {
        return loreService.getAllLore().collectList().flatMap(lores -> {
            if (lores.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(lores));
        });
    }

    public Mono<ServerResponse> getAllOrganizations(final ServerRequest serverRequest) {
        return organizationService.getAllOrganizations().collectList().flatMap(organizations -> {
            if (organizations.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(organizations));
        });
    }

    public Mono<ServerResponse> createOrganization(final ServerRequest serverRequest) {
        return organizationService.createOrganization(serverRequest.pathVariable(NAME))
                .flatMap(organization -> ServerResponse.created(getURI(organization)).bodyValue(organization));
    }

    public Mono<ServerResponse> getOrganization(final ServerRequest serverRequest) {
        return organizationService.getOrganization(serverRequest.pathVariable(NAME))
                .flatMap(organization -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(organization))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateOrganization(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Organization.class)
                .flatMap(organization -> organizationService.updateOrganization(serverRequest.pathVariable(NAME), organization))
                .flatMap(organization -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(organization))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Lore lore) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(lore.getName()).toUri();
    }
}
