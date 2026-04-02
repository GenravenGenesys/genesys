package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TalentRollModifiers {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private PlayerSkill skill;
}
