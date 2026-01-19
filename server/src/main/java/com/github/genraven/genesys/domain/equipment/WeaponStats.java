package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.RangeBand;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class WeaponStats {

    @Valid
    @Schema(description = "The skill associated with the weapon", requiredMode = Schema.RequiredMode.REQUIRED)
    private Skill skill;

    @Min(0)
    @Schema(description = "The damage of the weapon", requiredMode = Schema.RequiredMode.REQUIRED)
    private int damage;

    @Min(1)
    @Schema(description = "The critical rating of the weapon", requiredMode = Schema.RequiredMode.REQUIRED)
    private int critical;

    @EnumValidator(enumClass = RangeBand.class)
    @Schema(description = "The range band of the weapon", requiredMode = Schema.RequiredMode.REQUIRED)
    private RangeBand range;

    @Schema(description = "Whether the weapon damage is increased by Brawn", requiredMode = Schema.RequiredMode.REQUIRED)
    private boolean brawn;
}
