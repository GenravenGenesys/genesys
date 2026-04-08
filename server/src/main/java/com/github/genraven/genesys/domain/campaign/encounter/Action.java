package com.github.genraven.genesys.domain.campaign.encounter;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.enums.Difficulty;
import com.github.genraven.genesys.domain.enums.RangeBand;
import com.github.genraven.genesys.domain.enums.Target;
import com.github.genraven.genesys.domain.modifier.DiceModifier;
import com.github.genraven.genesys.domain.modifier.ResultsModifier;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
public class Action {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The category of action being taken during structured combat")
    private ActionType type = ActionType.SKILL_CHECK;

    @Schema(description = "The skill used to resolve this action; null for unarmed combat using default stats")
    private Skill skill = null;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Whether the check is opposed by the target's own skill roll rather than a fixed difficulty")
    private boolean opposed = false;

    @Schema(description = "Base difficulty of the check when not opposed (ignored when opposed=true)")
    private Difficulty difficulty = Difficulty.AVERAGE;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Who or what this action targets")
    private Target target = Target.ANY_ENEMY;

    @Schema(description = "Maximum range band at which this action can be performed")
    private RangeBand range = RangeBand.ENGAGED;

    @Schema(description = "Base damage dealt on a successful hit (Combat Checks only; 0 indicates no direct damage)")
    private int damage = 0;

    @Schema(description = "Whether the actor's Brawn characteristic is added to the damage value")
    private boolean brawnBonus = false;

    @Schema(description = "Critical rating of the attack (Combat Checks only; 0 means the attack cannot trigger a Critical Injury)")
    private int critical = 0;

    @Schema(description = "Dice added to or removed from the check's pool")
    private List<DiceModifier> diceModifiers = new ArrayList<>();

    @Schema(description = "Fixed result symbols added to the outcome of the check")
    private List<ResultsModifier> resultsModifiers = new ArrayList<>();

    @Getter
    @AllArgsConstructor
    public enum ActionType {
        /** Attack with a weapon or unarmed using a combat skill. */
        COMBAT_CHECK("Combat Check"),
        /** Perform any non-combat skill check (social, knowledge, etc.). */
        SKILL_CHECK("Skill Check"),
        /** Cast a spell using the Magic skill. */
        CAST_SPELL("Cast a Spell"),
        /** Activate a talent whose activation cost is one Action. */
        USE_TALENT("Use a Talent"),
        /** Activate a talent whose activation cost is one Action. */
        USE_ABILITY("Use an ability"),
        /** Spend the Action to perform an additional Maneuver (costs 2 Strain). */
        PERFORM_SECOND_MANEUVER("Perform a Second Maneuver");

        @JsonValue
        private final String label;
    }
}
