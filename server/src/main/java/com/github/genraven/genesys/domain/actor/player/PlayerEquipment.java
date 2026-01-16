package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.actor.equipment.ArmorInstance;
import com.github.genraven.genesys.domain.actor.equipment.GearInstance;
import com.github.genraven.genesys.domain.actor.equipment.WeaponInstance;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PlayerEquipment {
    private List<WeaponInstance> weapons;

    private ArmorInstance equippedArmor;

    private List<GearInstance> otherGear;
}
