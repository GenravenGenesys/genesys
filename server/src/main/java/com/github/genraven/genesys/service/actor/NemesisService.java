package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.NonPlayerActor;
import com.github.genraven.genesys.domain.actor.npc.SingleNonPlayerActor;
import com.github.genraven.genesys.repository.actor.NemesisRepository;
import com.github.genraven.genesys.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class NemesisService {

    private final NemesisRepository nemesisRepository;
    private final SkillService skillService;

    public Flux<Nemesis> getAllNemeses() {
        return nemesisRepository.findAll().map(nemesis -> {
            return nemesis;
        });
    }

    public Mono<Nemesis> getNemesis(final String name) {
        return nemesisRepository.findById(name).map(nemesis -> {
            return nemesis;
        });
    }

//    public Mono<Nemesis> createNemesis(final String name) {
//        return skillService.getSkillsForCurrentCampaign()
//            .flatMap(skills -> {
//                final Nemesis nemesis = new Nemesis((name));
//                nemesis.setSkills(skills.stream().map(ActorSkill::new).toList());
//                return nemesisRepository.save(nemesis);
//            });
//    }

    public Mono<Nemesis> updateNemesis(final String name, final Nemesis nemesis) {
        return getNemesis(name).map(nem -> {
            nem.setBrawn(nemesis.getBrawn());
            nem.setAgility(nemesis.getAgility());
            nem.setIntellect(nemesis.getIntellect());
            nem.setCunning(nemesis.getCunning());
            nem.setWillpower(nemesis.getWillpower());
            nem.setPresence(nemesis.getPresence());
            nem.setWounds(nemesis.getWounds());
            nem.setCombat(nemesis.getCombat());
            nem.setSocial(nemesis.getSocial());
            nem.setGeneral(nemesis.getGeneral());
            nem.setAbilities(nemesis.getAbilities());
            nem.setSkills(nemesis.getSkills());
            nem.setTalents(nemesis.getTalents());
            nem.setStrain(nemesis.getStrain());
            nem.setWeapons(nemesis.getWeapons());
            nem.setArmors(nemesis.getArmors());
            return nem;
        }).flatMap(nemesisRepository::save);
    }

    public Mono<Nemesis> updateNemesisSkill(final String id, final ActorSkill skill) {
        return nemesisRepository.findById(id).flatMap(nemesis -> {
            nemesis.getSkills().stream().filter(actorSkill -> actorSkill.getId().equals(skill.getId()))
                .forEach(actorSkill -> actorSkill.setRanks(skill.getRanks()));
            return nemesisRepository.save(nemesis);
        });
    }
}
