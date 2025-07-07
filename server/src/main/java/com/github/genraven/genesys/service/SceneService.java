package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.actor.npc.MinionGroup;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.domain.campaign.encounter.Character;
import com.github.genraven.genesys.repository.SceneRepository;
import com.github.genraven.genesys.util.CampaignUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class SceneService {

    private final SceneRepository sceneRepository;
    private final CampaignService campaignService;

    public Flux<Scene> getAllScenes() {
        return sceneRepository.findAll();
    }

    public Mono<Scene> getScene(final String name) {
        return sceneRepository.findById(name);
    }

    public Mono<Scene> createScene(final String name) {
        return sceneRepository.save(new Scene(name));
    }

    public Mono<Scene> updateScene(final String name, final Scene updatedScene) {
        log.debug("Updating scene: {}", updatedScene);
        return getScene(name).map(scene -> {
            scene.setName(updatedScene.getName());
            scene.setParty(updatedScene.getParty());
            scene.setEncounters(updatedScene.getEncounters());
            return scene;
        }).flatMap(sceneRepository::save)
                .doOnNext(scene -> log.debug("Updated scene: {}", scene));
    }

    public Flux<Scene> getScenesForCurrentCampaign() {
        return campaignService.getCurrentCampaign()
                .flatMapMany(campaign -> Flux.fromIterable(campaign.getSceneIds())
                        .flatMap(sceneRepository::findById));
    }

    public Mono<Campaign> addSceneToCurrentCampaign(final String sceneId) {
        return campaignService.getCurrentCampaign().flatMap(existingCampaign -> {
            existingCampaign.getSceneIds().add(sceneId);
            return campaignService.updateCampaign(existingCampaign.getId(), existingCampaign);
        });
    }

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
                            .flatMap(sceneRepository::findById);
                })
                .doOnNext(scene -> log.debug("Fetched scene for session '{}': {}", name, scene))
                .doOnError(error -> log.error("Error fetching scenes for session '{}'", name, error));
    }

    public Flux<MinionGroup> getEnemyMinions(final String id) {
        return getScene(id).flatMapMany(scene -> Flux.fromIterable(scene.getEnemyMinionGroups()));
    }

    public Mono<Scene> addEnemyMinionToScene(final String sceneId, final Minion minion, final int size) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyMinionGroups().add(new MinionGroup(minion, size));
            return sceneRepository.save(existingScene);
        });
    }

    public Flux<Rival> getEnemyRivals(final String id) {
        return getScene(id).flatMapMany(scene -> Flux.fromIterable(scene.getEnemyRivals()));
    }

    public Mono<Scene> addEnemyRivalToScene(final String sceneId, final Rival rival) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyRivals().add(rival);
            return sceneRepository.save(existingScene);
        });
    }

    public Flux<Nemesis> getEnemyNemeses(final String id) {
        return getScene(id).flatMapMany(scene -> Flux.fromIterable(scene.getEnemyNemeses()));
    }

    public Mono<Scene> addEnemyNemesisToScene(final String sceneId, final Nemesis nemesis) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyNemeses().add(nemesis);
            return sceneRepository.save(existingScene);
        });
    }

    public Flux<Character> getPlayerCharactersForScene(final String sceneId) {
        return getScene(sceneId)
                .flatMapMany(scene -> Flux.fromIterable(scene.getParty().getPlayers()).map(Character::new));
    }

    public Flux<Character> getNonPlayerCharactersForScene(final String sceneId) {
        return getScene(sceneId).flatMapMany(scene -> Flux.merge(
                Flux.fromIterable(scene.getEnemyNemeses())
                        .flatMap(nemesis -> Mono.just(new Character(nemesis))),
                Flux.fromIterable(scene.getEnemyRivals())
                        .flatMap(rival -> Mono.just(new Character(rival))),
                Flux.fromIterable(scene.getEnemyMinionGroups())
                        .flatMap(minionGroup -> Mono.just(new Character(minionGroup)))));
    }
}
