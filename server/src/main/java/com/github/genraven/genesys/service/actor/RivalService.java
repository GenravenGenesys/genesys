package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.NonPlayerActor;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.npc.SingleNonPlayerActor;

import com.github.genraven.genesys.repository.actor.RivalRepository;
import com.github.genraven.genesys.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class RivalService {

    private final RivalRepository rivalRepository;
    private final SkillService skillService;

    public Flux<Rival> getAllRivals() {
        log.info("Fetching all rivals");
        return rivalRepository.findAll()
                .map(rival -> {
                    rival.getTotalRivalStats();
                    log.debug("Processed rival: {}", rival.getName());
                    return rival;
                });
    }

    public Mono<Rival> getRival(final String id) {
        log.info("Fetching rival with ID: {}", id);
        return rivalRepository.findById(id)
                .doOnNext(rival -> log.debug("Found rival: {}", rival.getName()))
                .map(rival -> {
                    rival.getTotalRivalStats();
                    return rival;
                })
                .doOnError(err -> log.error("Failed to fetch rival with ID: {}", id, err));
    }

    public Mono<Rival> createRival(final String rivalName) {
        log.info("Creating new rival with name: {}", rivalName);
        return skillService.getSkillsForCurrentCampaign()
                .flatMap(skills -> {
                    final Rival rival = new Rival(new SingleNonPlayerActor(new NonPlayerActor(new Actor(rivalName))));
                    rival.setSkills(skills.stream().map(ActorSkill::new).toList());
                    log.debug("Constructed rival object: {}", rival);
                    return rivalRepository.save(rival);
                });
    }

    public Mono<Rival> updateRival(final String id, final Rival rival) {
        log.info("Updating rival with ID: {}", id);
        return getRival(id)
                .map(existing -> {
                    log.debug("Existing rival before update: {}", existing);
                    existing.setBrawn(rival.getBrawn());
                    // ... other setters
                    return existing;
                })
                .flatMap(rivalRepository::save)
                .doOnSuccess(updated -> log.info("Successfully updated rival: {}", updated.getName()))
                .doOnError(err -> log.error("Failed to update rival ID: {}", id, err));
    }

    public Mono<Rival> updateRivalSkill(final String id, final ActorSkill skill) {
        log.info("Updating rival skill: rivalId={}, skillId={}", id, skill.getId());
        return rivalRepository.findById(id)
                .flatMap(rival -> {
                    rival.getSkills().stream()
                            .filter(s -> s.getId().equals(skill.getId()))
                            .forEach(s -> s.setRanks(skill.getRanks()));
                    return rivalRepository.save(rival);
                })
                .doOnSuccess(updated -> log.debug("Updated rival skill for rival: {}", updated.getName()))
                .doOnError(err -> log.error("Failed to update rival skill", err));
    }
}
