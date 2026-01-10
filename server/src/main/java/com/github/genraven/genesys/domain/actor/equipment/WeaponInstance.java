package com.github.genraven.genesys.domain.actor.equipment;

import com.github.genraven.genesys.domain.RangeBand;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class WeaponInstance {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @NotNull
    private boolean restricted;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int encumbrance;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int damage;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Skill skill;

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int critical;

    @EnumValidator(enumClass = RangeBand.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private RangeBand range;

    @NotNull
    private boolean brawn;

    @Min(1)
    @Max(2)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int hands;
}