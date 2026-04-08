package com.github.genraven.genesys.domain;

import com.github.genraven.genesys.domain.campaign.encounter.Action;
import com.github.genraven.genesys.domain.campaign.encounter.Maneuver;
import com.github.genraven.genesys.domain.enums.Activation;
import com.github.genraven.genesys.domain.modifier.AbilityModifiers;
import com.github.genraven.genesys.domain.modifier.StatModifiers;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
public class Ability {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Activation activation = Activation.PASSIVE;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Cost cost = new Cost();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Limit limit = new Limit();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private StatModifiers statModifiers = new StatModifiers();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private AbilityModifiers abilityModifiers = new AbilityModifiers();

    @Schema(description = "Configuration for abilities that function as a maneuver activation")
    private Maneuver maneuver = null;

    @Schema(description = "Configuration for abilities that function as a action activation")
    private Action action = null;
}
