package com.github.genraven.genesys.domain.modifier;

import com.github.genraven.genesys.domain.enums.CheckTarget;
import com.github.genraven.genesys.domain.enums.DefenseType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class DefenseModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Whether this is a melee or ranged defense bonus")
    private DefenseType defenseType = DefenseType.MELEE;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Amount added to the specified defense (positive = bonus, negative = penalty)")
    private int amount = 1;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Whether this modifier applies to the performer (Self) or the maneuver's target (Opponent)")
    private CheckTarget appliesTo = CheckTarget.SELF;
}
