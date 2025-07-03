package com.github.genraven.genesys.service.equipment;

import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.Equipment;
import com.github.genraven.genesys.repository.equipment.ArmorRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ArmorService {

    private final ArmorRepository armorRepository;

    public Flux<Armor> getAllArmors() {
        return armorRepository.findAll();
    }

    public Mono<Armor> getArmor(final String name) {
        return armorRepository.findById(name);
    }

    public Mono<Armor> createArmor(final String name) {
        return armorRepository.save(new Armor(new Equipment(name)));
    }

    public Mono<Armor> updateArmor(final String name, final Armor armor) {
        return getArmor(name).map(arm -> {
            arm.setQualities(armor.getQualities());
            arm.setEncumbrance(armor.getEncumbrance());
            arm.setRarity(armor.getRarity());
            arm.setPrice(armor.getPrice());
            arm.setRestricted(armor.isRestricted());
            arm.setDescription(armor.getDescription());
            arm.setSoak(armor.getSoak());
            arm.setDefense(armor.getDefense());
            arm.setModifiers(armor.getModifiers());
            return arm;
        }).flatMap(armorRepository::save);
    }
}
