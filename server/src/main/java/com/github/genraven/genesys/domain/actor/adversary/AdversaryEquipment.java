package com.github.genraven.genesys.domain.actor.adversary;

import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdversaryEquipment {

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemTemplate> weapons;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ItemTemplate equippedArmor;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemTemplate> otherGear;
}
