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

import java.util.List;
import java.util.Optional;

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

    public Mono<List<Scene>> getScenesForCurrentCampaign() {
        return campaignService.getCurrentCampaign()
                .flatMap(campaign -> Flux.fromIterable(campaign.getSceneIds())
                        .flatMap(sceneRepository::findById)
                        .collectList());
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

    public Mono<List<Scene>> getScenesInSession(final String name) {
        log.info("Fetching scenes for session");

        return campaignService.getCurrentCampaign()
                .doOnNext(campaign -> log.debug("Found current campaign: {}", campaign))
                .flatMap(campaign -> {
                    final Session session = CampaignUtil.getSessionFromCampaign(name, campaign);
                    return Flux.fromIterable(session.getSceneIds())
                            .flatMap(sceneRepository::findById)
                            .collectList();
                })
                .doOnNext(scenes -> log.debug("Fetched scenes for session '{}': {}", name, scenes))
                .doOnError(error -> log.error("Error fetching scenes for session '{}'", name, error));
    }

    public Mono<List<MinionGroup>> getEnemyMinions(final String id) {
        return getScene(id).flatMap(scene -> Flux.fromIterable(scene.getEnemyMinionGroups()).collectList());
    }

    public Mono<Scene> addEnemyMinionToScene(final String sceneId, final Minion minion, final int size) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyMinionGroups().add(new MinionGroup(minion, size));
            return sceneRepository.save(existingScene);
        });
    }

    public Mono<List<Rival>> getEnemyRivals(final String id) {
        return getScene(id).flatMap(scene -> Flux.fromIterable(scene.getEnemyRivals()).collectList());
    }

    public Mono<Scene> addEnemyRivalToScene(final String sceneId, final Rival rival) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyRivals().add(rival);
            return sceneRepository.save(existingScene);
        });
    }

    public Mono<List<Nemesis>> getEnemyNemeses(final String id) {
        return getScene(id).flatMap(scene -> Flux.fromIterable(scene.getEnemyNemeses()).collectList());
    }

    public Mono<Scene> addEnemyNemesisToScene(final String sceneId, final Nemesis nemesis) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyNemeses().add(nemesis);
            return sceneRepository.save(existingScene);
        });
    }

    public Mono<List<Character>> getPlayerCharactersForScene(final String sceneId) {
        return getScene(sceneId)
                .flatMap(scene -> Flux.fromIterable(scene.getParty().getPlayers()).map(Character::new).collectList());
    }

    public Mono<List<Character>> getNonPlayerCharactersForScene(final String sceneId) {
        return getScene(sceneId).flatMap(scene -> Flux.merge(
                Flux.fromIterable(scene.getEnemyNemeses())
                        .flatMap(nemesis -> Mono.just(new Character(nemesis))),
                Flux.fromIterable(scene.getEnemyRivals())
                        .flatMap(rival -> Mono.just(new Character(rival))),
                Flux.fromIterable(scene.getEnemyMinionGroups())
                        .flatMap(minionGroup -> Mono.just(new Character(minionGroup))))
                .collectList());
    }
}
