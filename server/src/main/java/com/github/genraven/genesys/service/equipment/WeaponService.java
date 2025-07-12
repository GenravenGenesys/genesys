package com.github.genraven.genesys.service.equipment;

import com.github.genraven.genesys.domain.equipment.Equipment;
import com.github.genraven.genesys.domain.equipment.Weapon;
import com.github.genraven.genesys.repository.equipment.WeaponRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class WeaponService {

    private final WeaponRepository weaponRepository;

    public Flux<Weapon> getAllWeapons() {
        return weaponRepository.findAll();
    }

    public Mono<Weapon> getWeapon(final String name) {
        return weaponRepository.findById(name);
    }

    public Mono<Weapon> createWeapon(final String name) {
        return weaponRepository.save(new Weapon(new Equipment(name)));
    }

    public Mono<Weapon> updateWeapon(final String name, final Weapon weapon) {
        return getWeapon(name).map(wea -> {
            wea.setQualities(weapon.getQualities());
            wea.setEncumbrance(weapon.getEncumbrance());
            wea.setRarity(weapon.getRarity());
            wea.setPrice(weapon.getPrice());
            wea.setRestricted(weapon.isRestricted());
            wea.setDescription(weapon.getDescription());
            wea.setDamage(weapon.getDamage());
            wea.setCritical(weapon.getCritical());
            wea.setSkill(weapon.getSkill());
            wea.setRange(weapon.getRange());
            wea.setBrawn(weapon.isBrawn());
            wea.setHands(weapon.getHands());
            wea.setModifiers(weapon.getModifiers());
            return wea;
        }).flatMap(weaponRepository::save);
    }
}
