package com.github.genraven.genesys.domain.modifier;

import com.github.genraven.genesys.domain.common.GenesysSymbolResults;
import com.github.genraven.genesys.domain.enums.CheckContext;
import com.github.genraven.genesys.domain.enums.CheckTarget;
import com.github.genraven.genesys.domain.enums.SkillType;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ResultsModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "The fixed results added to the pool")
    private GenesysSymbolResults results;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "The kind of check that triggers this modifier")
    private CheckContext checkContext;

    @Schema(description = "Restricts this modifier to checks of a particular skill type; null means any skill type")
    private SkillType skillType;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "Whether this modifier applies to the character's own rolls or to rolls made against them")
    private CheckTarget checkTarget;

    @Schema(description = "Restricts this modifier to a specific skill; null means any skill matching skillType")
    private Skill skill;
}