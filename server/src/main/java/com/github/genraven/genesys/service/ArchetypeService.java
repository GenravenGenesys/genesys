package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.repository.ArchetypeRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ArchetypeService {
    private final ArchetypeRepository archetypeRepository;

    public Flux<Archetype> getAllArchetypes() {
        return archetypeRepository.findAll();
    }

    public Mono<Archetype> getArchetype(final String name) {
        return archetypeRepository.findById(name);
    }

    public Mono<Archetype> createArchetype(final String name) {
        return archetypeRepository.save(new Archetype(name));
    }

    public Mono<Archetype> updateArchetype(final String name, final Archetype archetype) {
        return getArchetype(name).map(arch -> {
            arch.setDescription(archetype.getDescription());
            arch.setBrawn(archetype.getBrawn());
            arch.setAgility(archetype.getAgility());
            arch.setIntellect(archetype.getIntellect());
            arch.setCunning(archetype.getCunning());
            arch.setWillpower(archetype.getWillpower());
            arch.setPresence(archetype.getPresence());
            arch.setWounds(archetype.getWounds());
            arch.setStrain(archetype.getStrain());
            arch.setExperience(archetype.getExperience());
            arch.setSkill(archetype.getSkill());
            arch.setAbilities(archetype.getAbilities());
            return arch;
        }).flatMap(archetypeRepository::save);
    }
}
