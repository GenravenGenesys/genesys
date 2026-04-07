package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.enums.Duration;
import com.github.genraven.genesys.domain.enums.Target;
import com.github.genraven.genesys.domain.modifier.DefenseModifier;
import com.github.genraven.genesys.domain.modifier.DiceModifier;
import com.github.genraven.genesys.domain.modifier.ResultsModifier;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ManeuverData {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Who this maneuver targets (Self, Engaged Ally, etc.)")
    private Target target = Target.SELF;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "How long the effects of this maneuver last")
    private Duration duration = Duration.END_OF_NEXT_TURN;

    @Schema(description = "Whether multiple uses of this maneuver stack (e.g., assist maneuver)")
    private boolean stackable = false;

    @Schema(description = "Maximum number of targets affected. Ignored when targetCountSkill is set.")
    private int maxTargets = 1;

    @Schema(description = "When set, the number of targets equals the performer's current rank in this skill "
            + "(e.g., Leadership for Coordinated Assault). Overrides maxTargets.")
    private Skill targetCountSkill = null;

    @Schema(description = "When true, the effective range increases by one band per additional rank in the talent.")
    private boolean rangeScalesWithRank = false;

    @Schema(description = "Dice added to affected characters' pools. "
            + "checkTarget=SELF applies to the performer; checkTarget=OPPONENT applies to the maneuver's target(s).")
    private List<DiceModifier> diceModifiers = new ArrayList<>();

    @Schema(description = "Fixed result symbols added to affected characters' checks. "
            + "checkTarget=SELF applies to the performer; checkTarget=OPPONENT applies to the maneuver's target(s).")
    private List<ResultsModifier> resultsModifiers = new ArrayList<>();

    @Schema(description = "Defense bonuses or penalties applied when this maneuver is performed.")
    private List<DefenseModifier> defenseModifiers = new ArrayList<>();
}

