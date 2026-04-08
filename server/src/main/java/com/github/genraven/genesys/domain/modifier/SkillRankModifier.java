package com.github.genraven.genesys.domain.modifier;

import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SkillRankModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The skill whose rank is modified")
    private Skill skill;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The number of ranks to add; positive values increase the rank")
    private int ranks;
}
