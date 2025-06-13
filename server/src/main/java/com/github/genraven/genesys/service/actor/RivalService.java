package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.NonPlayerActor;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.npc.SingleNonPlayerActor;

import com.github.genraven.genesys.repository.actor.RivalRepository;
import com.github.genraven.genesys.service.SkillService;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class RivalService {

    private static final Logger logger = LoggerFactory.getLogger(RivalService.class);
    private final RivalRepository rivalRepository;
    private final SkillService skillService;

    public Flux<Rival> getAllRivals() {
        logger.info("Fetching all Rivals");
        return rivalRepository.findAll().map(rival -> {
            rival.getTotalRivalStats();
            return rival;
        }).doOnNext(rival -> logger.debug("Fetched Rival: {}", rival.getName()));
    }

    public Mono<Rival> getRival(final String id) {
        logger.info("Fetching Rival with id: {}", id);
        return rivalRepository.findById(id).map(rival -> {
            logger.info("Found Rival: {}", rival);
            System.out.println(rival.toString());
            rival.getTotalRivalStats();
            return rival;
        }).doOnNext(rival -> logger.debug("Fetched Rival: {}", rival))
                .doOnError(error -> logger.error("Error fetching Rival with id: {}", id, error));
    }

    // public Mono<Rival> createRival(final String rivalName) {
    //     logger.info("Starting createRival method with rivalName: {}", rivalName);
    //     return skillService.getSkillsForCurrentCampaign()
    //             .flatMap(skills -> {
    //                 final Rival rival = new Rival(new SingleNonPlayerActor(new NonPlayerActor(new Actor(rivalName))));
    //                 rival.setSkills(skills.stream().map(ActorSkill::new).toList());
    //                 return rivalRepository.save(rival);
    //             });
    // }

    public Mono<Rival> createRival(final String rivalName) {
        logger.info("Starting createRival method with rivalName: {}", rivalName);

        return skillService.getSkillsForCurrentCampaign()
                .doOnNext(skills -> logger.info("Retrieved {} skills for current campaign", skills.size()))
                .flatMap(skills -> {
                    final Rival rival = new Rival(new SingleNonPlayerActor(new NonPlayerActor(new Actor(rivalName))));
                    rival.setSkills(skills.stream().map(ActorSkill::new).toList());
                    logger.info("Created Rival entity: {}", rival);

                return Mono.just(rival)
                        .doOnNext(r -> logger.info("Rival before saving: {}", r)) // Debug logging before persistence
                        .flatMap(rivalRepository::save)
                        .doOnSuccess(savedRival -> logger.info("Successfully saved Rival: {}", savedRival))
                        .doOnError(error -> logger.error("Failed to save Rival", error));
                });
    }

    public Mono<Rival> updateRival(final String id, final Rival rival) {
        return getRival(id).map(riv -> {
            riv.setBrawn(rival.getBrawn());
            riv.setAgility(rival.getAgility());
            riv.setIntellect(rival.getIntellect());
            riv.setCunning(rival.getCunning());
            riv.setWillpower(rival.getWillpower());
            riv.setPresence(rival.getPresence());
            riv.setWounds(rival.getWounds());
            riv.setCombat(rival.getCombat());
            riv.setSocial(rival.getSocial());
            riv.setGeneral(rival.getGeneral());
            riv.setAbilities(rival.getAbilities());
            riv.setSkills(rival.getSkills());
            riv.setTalents(rival.getTalents());
            riv.setWeapons(rival.getWeapons());
            riv.setArmors(rival.getArmors());
            return riv;
        }).flatMap(rivalRepository::save);
    }

    public Mono<Rival> updateRivalSkill(final String id, final ActorSkill skill) {
        return rivalRepository.findById(id).flatMap(rival -> {
            rival.getSkills().stream().filter(actorSkill -> actorSkill.getId().equals(skill.getId()))
                    .forEach(actorSkill -> actorSkill.setRanks(skill.getRanks()));
            return rivalRepository.save(rival);
        });
    }
}
