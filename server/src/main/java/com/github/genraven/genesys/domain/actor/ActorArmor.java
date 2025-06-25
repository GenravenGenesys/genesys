package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorArmor extends Armor {

    protected ActorArmor() {}

    public ActorArmor(final Armor armor) {
        this.setId(armor.getId());
        this.setName(armor.getName());
        this.setDescription(armor.getDescription());
        this.setPrice(armor.getPrice());
        this.setRestricted(armor.isRestricted());
        this.setEncumbrance(armor.getEncumbrance());
        this.setRarity(armor.getRarity());
        this.setModifiers(armor.getModifiers());
        this.setQualities(armor.getQualities());
        this.setSoak(armor.getSoak());
        this.setDefense(armor.getDefense());
    }

    private EquipmentSlot slot = EquipmentSlot.NONE;
}
