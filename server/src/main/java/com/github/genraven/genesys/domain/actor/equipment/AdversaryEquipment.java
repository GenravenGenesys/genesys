package com.github.genraven.genesys.domain.actor.equipment;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdversaryEquipment {
    private List<WeaponInstance> weapons;

    private ArmorInstance equippedArmor;

    private List<GearInstance> otherGear;
}
