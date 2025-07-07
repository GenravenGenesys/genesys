package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.service.SceneService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Slf4j
@Component
@RequiredArgsConstructor
public class SceneHandler extends BaseHandler {

    private final SceneService sceneService;

    public Mono<ServerResponse> getAllScenes(final ServerRequest serverRequest) {
        return sceneService.getAllScenes().collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> getScene(final ServerRequest serverRequest) {
        return sceneService.getScene(serverRequest.pathVariable(NAME))
                .flatMap(scene -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(scene))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createScene(final ServerRequest serverRequest) {
        return sceneService.createScene(serverRequest.pathVariable(NAME))
                .flatMap(scene -> ServerResponse.created(getURI(scene.getName())).bodyValue(scene));
    }

    public Mono<ServerResponse> updateScene(final ServerRequest serverRequest) {
        log.info("Updating scene {}", serverRequest.bodyToMono(Scene.class));
        return serverRequest.bodyToMono(Scene.class)
                .flatMap(scene -> sceneService.updateScene(serverRequest.pathVariable(NAME), scene))
                .flatMap(scene -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(scene))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getScenesForCurrentCampaign(final ServerRequest serverRequest) {
        return sceneService.getScenesForCurrentCampaign().collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> addSceneToCurrentCampaign(final ServerRequest request) {
        return request.bodyToMono(Scene.class)
                .flatMap(scene -> sceneService.addSceneToCurrentCampaign(scene.getId()))
                .flatMap(updatedCampaign -> ServerResponse.ok().bodyValue(updatedCampaign))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> addSceneToSessionInCurrentCampaign(final ServerRequest request) {
        return sceneService.addSceneToSessionInCurrentCampaign(request.pathVariable(NAME), request.pathVariable(ID))
                .flatMap(updatedSession -> ServerResponse.ok().bodyValue(updatedSession))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getScenesFromSession(final ServerRequest request) {
        return sceneService.getScenesInSession(request.pathVariable(NAME)).collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> getEnemyMinions(final ServerRequest serverRequest) {
        return sceneService.getEnemyMinions(serverRequest.pathVariable(ID)).collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> addEnemyMinionToScene(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Minion.class)
                .flatMap(minion -> sceneService.addEnemyMinionToScene(serverRequest.pathVariable(ID), minion,
                        Integer.parseInt(serverRequest.pathVariable("size"))))
                .flatMap(updatedScene -> ServerResponse.ok().bodyValue(updatedScene))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getEnemyRivals(final ServerRequest serverRequest) {
        return sceneService.getEnemyRivals(serverRequest.pathVariable(ID)).collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> addEnemyRivalToScene(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Rival.class)
                .flatMap(rival -> sceneService.addEnemyRivalToScene(serverRequest.pathVariable(ID), rival))
                .flatMap(updatedScene -> ServerResponse.ok().bodyValue(updatedScene))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getEnemyNemeses(final ServerRequest serverRequest) {
        return sceneService.getEnemyNemeses(serverRequest.pathVariable(ID)).collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> addEnemyNemesisToScene(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Nemesis.class)
                .flatMap(nemesis -> sceneService.addEnemyNemesisToScene(serverRequest.pathVariable(ID), nemesis))
                .flatMap(updatedScene -> ServerResponse.ok().bodyValue(updatedScene))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getPlayerCharacters(final ServerRequest serverRequest) {
        return sceneService.getPlayerCharactersForScene(serverRequest.pathVariable(ID)).collectList()
                .flatMap(scenes -> {
                    if (scenes.isEmpty()) {
                        return ServerResponse.noContent().build();
                    }
                    return ServerResponse.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(fromValue(scenes));
                });
    }

    public Mono<ServerResponse> getNonPlayerCharacters(final ServerRequest serverRequest) {
        return sceneService.getNonPlayerCharactersForScene(serverRequest.pathVariable(ID)).collectList()
                .flatMap(scenes -> {
                    if (scenes.isEmpty()) {
                        return ServerResponse.noContent().build();
                    }
                    return ServerResponse.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(fromValue(scenes));
                });
    }
}
