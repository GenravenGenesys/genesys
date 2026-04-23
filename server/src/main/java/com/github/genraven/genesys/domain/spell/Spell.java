package com.github.genraven.genesys.domain.spell;

import com.github.genraven.genesys.domain.enums.Difficulty;
import com.github.genraven.genesys.domain.enums.RangeBand;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific Spell")
public class Spell {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private boolean concentration = false;

    @EnumValidator(enumClass = Difficulty.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty difficulty = Difficulty.EASY;

    @EnumValidator(enumClass = RangeBand.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private RangeBand range = RangeBand.SHORT;

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Skill> skills = new ArrayList<>();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<SpellEffect> effects = new ArrayList<>();
}
