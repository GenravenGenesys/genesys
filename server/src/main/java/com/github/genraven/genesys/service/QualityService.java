package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.equipment.Quality;
import com.github.genraven.genesys.repository.QualityRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class QualityService {

    private final QualityRepository qualityRepository;

    public Flux<Quality> getAllQualities() {
        return qualityRepository.findAll();
    }

    public Mono<Quality> getQuality(final String name) {
        return qualityRepository.findById(name);
    }

    public Mono<Quality> createQuality(final String name) {
        return qualityRepository.save(new Quality(name));
    }

    public Mono<Quality> updateQuality(final String name, final Quality quality) {
        return getQuality(name).map(qual -> {
            qual.setDescription(quality.getDescription());
            qual.setCost(quality.getCost());
            qual.setWeapon(quality.isWeapon());
            qual.setArmor(quality.isArmor());
            qual.setModifiers(quality.getModifiers());
            return qual;
        }).flatMap(qualityRepository::save);
    }
}
