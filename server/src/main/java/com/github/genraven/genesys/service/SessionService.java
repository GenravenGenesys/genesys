package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.context.session.SessionStartSceneContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {

    private final CampaignService campaignService;
    private final SceneService sceneService;

    public Mono<Scene> startScene(final SessionStartSceneContext context) {
        log.info("Starting scene with id: {}", context.scene().getId());
        context.scene().setParty(context.session().getParty());
        context.scene().setActive(Boolean.TRUE);
        return sceneService.updateScene(context.scene().getId(), context.scene())
            .doOnNext(updatedScene -> log.debug("Started scene: {}", updatedScene))
            .doOnError(error -> log.error("Error starting scene with id: {}", context.scene().getId(), error));
    }
}
