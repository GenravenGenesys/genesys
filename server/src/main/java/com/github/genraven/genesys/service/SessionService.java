package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.domain.context.session.SessionStartSceneContext;
import com.github.genraven.genesys.util.CampaignUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {

    private final CampaignService campaignService;
    private final SceneService sceneService;

    public Mono<Session> addSceneToSessionInCurrentCampaign(final String name, final String sceneId) {
        return campaignService.getCurrentCampaign()
            .flatMap(campaign -> {
                final Session session = CampaignUtil.getSessionFromCampaign(name, campaign);
                session.getSceneIds().add(sceneId);
                return campaignService.updateCampaign(campaign.getId(), campaign)
                    .thenReturn(session);
            });
    }

    public Flux<Scene> getScenesInSession(final String name) {
        log.info("Fetching scenes for session");
        return campaignService.getCurrentCampaign()
            .doOnNext(campaign -> log.debug("Found current campaign: {}", campaign))
            .flatMapMany(campaign -> {
                final Session session = CampaignUtil.getSessionFromCampaign(name, campaign);
                return Flux.fromIterable(session.getSceneIds())
                    .flatMap(sceneService::getScene);
            })
            .doOnNext(scene -> log.debug("Fetched scene for session '{}': {}", name, scene))
            .doOnError(error -> log.error("Error fetching scenes for session '{}'", name, error));
    }

    public Mono<Scene> startScene(final SessionStartSceneContext context) {
        log.info("Starting scene with id: {}", context.scene().getId());
        context.scene().setParty(context.session().getParty());
        context.scene().setActive(Boolean.TRUE);
        return sceneService.updateScene(context.scene().getId(), context.scene())
            .doOnNext(updatedScene -> log.debug("Started scene: {}", updatedScene))
            .doOnError(error -> log.error("Error starting scene with id: {}", context.scene().getId(), error));
    }
}
