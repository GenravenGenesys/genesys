package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.enums.CharacteristicType;
import com.github.genraven.genesys.domain.enums.SkillType;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific skills on player")
public class PlayerSkill {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Builder.Default
    @EnumValidator(enumClass = CharacteristicType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private CharacteristicType characteristic = CharacteristicType.BRAWN;

    @Builder.Default
    @EnumValidator(enumClass = SkillType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private SkillType type = SkillType.GENERAL;

    @Builder.Default
    @NotNull
    private Boolean initiative = false;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int ranks;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "A short summary of the skill")
    private String summary;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "A detailed description of the skill")
    private String description;
}
