package com.github.genraven.genesys.service.equipment;

import com.github.genraven.genesys.domain.equipment.Equipment;
import com.github.genraven.genesys.domain.equipment.Gear;
import com.github.genraven.genesys.repository.equipment.GearRepository;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class GearService {

    private final GearRepository gearRepository;

    public Flux<Gear> getAllGears() {
        log.info("Fetching all gear");
        return gearRepository.findAll().doOnNext(gear -> log.debug("Fetched gear: {}", gear.getName()));
    }

    public Mono<Gear> getGear(final String id) {
        log.info("Fetching gear with id: {}", id);
        return gearRepository.findById(id)
            .doOnNext(gear -> log.debug("Fetched gear: {}", gear))
            .doOnError(error -> log.error("Error fetching gear with id: {}", id, error));
    }

    public Mono<Gear> createGear(final String name) {
        return gearRepository.save(new Gear(new Equipment(name)));
    }

    public Mono<Gear> updateGear(final String name, final Gear gear) {
        return getGear(name).map(ge -> {
            ge.setQualities(gear.getQualities());
            ge.setEncumbrance(gear.getEncumbrance());
            ge.setRarity(gear.getRarity());
            ge.setPrice(gear.getPrice());
            ge.setRestricted(gear.isRestricted());
            ge.setRange(gear.getRange());
            ge.setAmount(gear.getAmount());
            ge.setDescription(gear.getDescription());
            ge.setModifiers(gear.getModifiers());
            return ge;
        }).flatMap(gearRepository::save);
    }
}
