package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.domain.context.session.SessionStartSceneContext;
import com.github.genraven.genesys.exceptions.SceneValidationException;
import com.github.genraven.genesys.service.CampaignService;
import com.github.genraven.genesys.service.SceneService;
import com.github.genraven.genesys.service.SessionService;
import com.github.genraven.genesys.util.CampaignUtil;
import com.github.genraven.genesys.validator.SessionContextValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.Map;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class SessionHandler {

    private final CampaignService campaignService;
    private final SessionService sessionService;
    private final SceneService sceneService;
    private final SessionContextValidator contextValidator;

    public Mono<ServerResponse> addSceneToSessionInCurrentCampaign(final ServerRequest request) {
        return sessionService.addSceneToSessionInCurrentCampaign(request.pathVariable(NAME), request.pathVariable(ID))
            .flatMap(updatedSession -> ServerResponse.ok().bodyValue(updatedSession))
            .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getScenesFromSession(final ServerRequest request) {
        return sessionService.getScenesInSession(request.pathVariable(NAME)).collectList().flatMap(scenes -> {
            if (scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> startScene(final ServerRequest request) {
        final String sessionName = request.pathVariable(NAME);
        final String sceneId = request.pathVariable(ID);
        Mono<Session> sessionMono = campaignService.getCurrentCampaign()
            .flatMap(campaign -> CampaignUtil.getMonoSessionFromCampaign(sessionName, campaign));
        Mono<Scene> sceneMono = sceneService.getScene(sceneId);
        return Mono.zip(sessionMono, sceneMono)
            .map(tuple -> new SessionStartSceneContext(
                tuple.getT1(),
                tuple.getT2()))
            .flatMap(context -> contextValidator.validateSession(
                context,
                ctx -> sessionService.startScene(ctx.getSession(), ctx.getScene())))
            .flatMap(updatedScene -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(updatedScene)))
            .onErrorResume(SceneValidationException.class, ex -> ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(Map.of("errors", ex.getErrors()))))
            .switchIfEmpty(ServerResponse.notFound().build());
    }
}
