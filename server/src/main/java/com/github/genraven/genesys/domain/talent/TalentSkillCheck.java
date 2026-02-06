package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.enums.Difficulty;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TalentSkillCheck {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ActorSkill skill;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty difficulty;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ActorSkill opposedSkill;
}
