package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.npc.*;
import com.github.genraven.genesys.repository.actor.MinionRepository;
import com.github.genraven.genesys.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class MinionService {

    private final MinionRepository minionRepository;
    private final SkillService skillService;

    public Flux<Minion> getAllMinions() {
        return minionRepository.findAll().map(minion -> {
            return minion;
        });
    }

    public Mono<Minion> getMinion(final String id) {
        return minionRepository.findById(id).map(minion -> {
            return minion;
        });
    }

    public Mono<Minion> createMinion(final String name) {
        return skillService.getSkillsForCurrentCampaign()
                .flatMap(skills -> {
                    final Minion minion = new Minion(new NonPlayerActor(new Actor(name)));
                    minion.setSkills(skills.stream().map(GroupSkill::new).toList());
                    return minionRepository.save(minion);
                });
    }

    public Mono<Minion> updateMinion(final String name, final Minion minion) {
        return minionRepository.findById(name).map(min -> {
            min.setBrawn(minion.getBrawn());
            min.setAgility(minion.getAgility());
            min.setIntellect(minion.getIntellect());
            min.setCunning(minion.getCunning());
            min.setWillpower(minion.getWillpower());
            min.setPresence(minion.getPresence());
            min.setWounds(minion.getWounds());
            min.setCombat(minion.getCombat());
            min.setSocial(minion.getSocial());
            min.setGeneral(minion.getGeneral());
            min.setAbilities(minion.getAbilities());
            min.setSkills(minion.getSkills());
            min.setTalents(minion.getTalents());
            min.setWeapons(minion.getWeapons());
            min.setArmors(minion.getArmors());
            return min;
        }).flatMap(minionRepository::save);
    }

    public Mono<Minion> updateMinionSkill(final String id, final GroupSkill skill) {
        return minionRepository.findById(id).flatMap(minion -> {
            minion.getSkills().stream().filter(actorSkill -> actorSkill.getId().equals(skill.getId()))
                    .forEach(actorSkill -> actorSkill.setGroup(skill.isGroup()));
            return minionRepository.save(minion);
        });
    }
}
