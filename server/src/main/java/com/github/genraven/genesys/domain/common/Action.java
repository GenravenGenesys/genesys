package com.github.genraven.genesys.domain.common;

import com.github.genraven.genesys.domain.enums.Difficulty;
import com.github.genraven.genesys.domain.enums.RangeBand;
import com.github.genraven.genesys.domain.actor.ActorSkill;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class Action {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ActorSkill skill;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty difficulty;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ActorSkill opposedSkill;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private RangeBand rangeBand = RangeBand.ENGAGED;
}
