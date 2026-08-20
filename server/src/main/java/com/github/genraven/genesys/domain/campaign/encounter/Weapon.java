package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.enums.RangeBand;
import com.github.genraven.genesys.domain.quality.EquipmentQuality;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class Weapon {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

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

    @Valid
    @Builder.Default
    @Schema(description = "Active qualities on this weapon")
    private List<EquipmentQuality> qualities = new ArrayList<>();
}
