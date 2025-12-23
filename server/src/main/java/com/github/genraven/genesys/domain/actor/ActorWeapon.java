package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.equipment.Weapon;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorWeapon extends Weapon {

    protected ActorWeapon() {
    }

    public ActorWeapon(final Weapon weapon) {
        this.setId(weapon.getId());
        this.setName(weapon.getName());
        this.setDescription(weapon.getDescription());
        this.setPrice(weapon.getPrice());
        this.setRestricted(weapon.isRestricted());
        this.setEncumbrance(weapon.getEncumbrance());
        this.setRarity(weapon.getRarity());
        this.setModifiers(weapon.getModifiers());
        this.setQualities(weapon.getQualities());
        this.setDamage(weapon.getDamage());
        this.setSkill(weapon.getSkill());
        this.setCritical(weapon.getCritical());
        this.setRange(weapon.getRange());
        this.setBrawn(weapon.isBrawn());
        this.setHands(weapon.getHands());
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private EquipmentSlot slot = EquipmentSlot.NONE;
}
