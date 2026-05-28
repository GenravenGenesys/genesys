package com.github.genraven.genesys.domain.campaign.encounter;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ParticipantEquipment {

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Weapon> equippedWeapons;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Weapon> weapons;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Armor equippedArmor;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Armor> armor;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Gear> otherGear;
}
