package com.github.genraven.genesys.domain.skill;

import com.github.genraven.genesys.domain.enums.CharacteristicType;
import com.github.genraven.genesys.domain.enums.SkillType;
import com.github.genraven.genesys.validator.EnumValidator;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific skills")
public class Skill {

    @Id
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
    private boolean initiative = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String summary;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;
}
