package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.motivation.Motivation;
import com.github.genraven.genesys.repository.MotivationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class MotivationService {

    private final MotivationRepository motivationRepository;

    public Flux<Motivation> getAllMotivations() {
        return motivationRepository.findAll();
    }

    public Mono<Motivation> getMotivation(final String name) {
        return motivationRepository.findById(name);
    }

    public Mono<Motivation> createMotivation(final String name) {
        return motivationRepository.save(new Motivation(name));
    }

    public Mono<Motivation> updateMotivation(final String name, final Motivation motivation) {
        return getMotivation(name).map(mot -> {
            mot.setType(motivation.getType());
            mot.setDescription(motivation.getDescription());
            mot.setMin(motivation.getMin());
            mot.setMax(motivation.getMax());
            return mot;
        }).flatMap(motivationRepository::save);
    }
}
