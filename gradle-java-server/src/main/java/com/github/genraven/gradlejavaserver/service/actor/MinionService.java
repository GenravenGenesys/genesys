package com.github.genraven.gradlejavaserver.service.actor;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.MinionActor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.NonPlayerActor;
import com.github.genraven.gradlejavaserver.repository.actor.MinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MinionService {

    private final MinionRepository minionRepository;

    @Autowired
    public MinionService(final MinionRepository minionRepository) {
        this.minionRepository = minionRepository;
    }

    public Flux<MinionActor> getAllMinions() {
        return minionRepository.findAll();
    }

    public Mono<MinionActor> getMinion(final String name) {
        return minionRepository.findById(name);
    }

    public Mono<MinionActor> createMinion(final String name) {
        return minionRepository.save(new MinionActor(new NonPlayerActor(new Actor(name))));
    }

    public Mono<MinionActor> updateMinion(final String name, final MinionActor minionActor) {
        return minionRepository.findById(name).map(min -> {
            min.setBrawn(minionActor.getBrawn());
            min.setAgility(minionActor.getAgility());
            min.setIntellect(minionActor.getIntellect());
            min.setCunning(minionActor.getCunning());
            min.setWillpower(minionActor.getWillpower());
            min.setPresence(minionActor.getPresence());
            min.setWounds(minionActor.getWounds());
            min.setCombat(minionActor.getCombat());
            min.setSocial(minionActor.getSocial());
            min.setGeneral(minionActor.getGeneral());
            min.setAbilities(minionActor.getAbilities());
            min.setSkills(minionActor.getSkills());
            min.setTalents(minionActor.getTalents());
            min.setSettings(minionActor.getSettings());
            min.setWeapons(minionActor.getWeapons());
            min.setArmors(minionActor.getArmors());
            return min;
        }).flatMap(minionRepository::save);
    }
}
