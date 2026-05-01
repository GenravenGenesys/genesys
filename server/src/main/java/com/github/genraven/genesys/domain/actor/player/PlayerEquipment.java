package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.equipment.ItemInstance;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PlayerEquipment {

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemInstance> weapons;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ItemInstance equippedArmor;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemInstance> otherGear;
}
