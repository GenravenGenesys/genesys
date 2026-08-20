package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.actor.StatusEffect;
import com.github.genraven.genesys.domain.skill.RankedSkill;
import com.github.genraven.genesys.domain.enums.Difficulty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TalentSkillCheck {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private RankedSkill skill = null;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty difficulty  = null;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private RankedSkill opposedSkill = null;

    @Schema(description = "Condition inflicted on the opponent when the check succeeds")
    private StatusEffect onSuccessCondition = null;
}
