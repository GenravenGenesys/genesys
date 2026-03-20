package com.github.genraven.genesys.domain.modifier;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AbilityModifiers {

    /**
     * General-purpose dice additions/removals scoped to a check context and direction.
     * Examples:
     *   - Forge Dwarf: SETBACK, amount=1, context=ALL, skillType=SOCIAL, target=OPPONENT
     *   - Clone:       ADVANTAGE, amount=1, context=OPPOSED, skillType=null, target=SELF
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Dice added to or removed from rolls based on check context")
    private List<DiceModifier> diceModifiers = new ArrayList<>();

    /**
     * Healing effects triggered when this ability activates.
     * Example: heal strain equal to cybernetics count.
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Healing applied to wounds or strain when the ability is used")
    private List<HealEffect> healEffects = new ArrayList<>();

    /**
     * Environmental/terrain immunities.
     * Example: Loonie ignores difficult terrain in zero-gravity environments.
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Terrain or environmental effects ignored by this character")
    private List<EnvironmentModifier> environmentModifiers = new ArrayList<>();

    /**
     * Dwarf: after suffering a Critical Injury, spend a Story Point to count the
     * result as "01". Timing and cost are expressed on the parent Ability/Talent.
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Critical Injury result is treated as 01 when this ability is triggered")
    private boolean criticalInjuryCountAsOne = false;

    /**
     * Catfolk: a second maneuver used solely for movement does not cause strain.
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "A second move maneuver costs no strain")
    private boolean freeMoveManeuver = false;

    /**
     * Human: move one Story Point from the GM pool to the players' pool.
     * Activation timing and session limit live on the parent Ability/Talent.
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Moves a Story Point from the GM pool to the players' pool")
    private boolean moveStoryPoint = false;
}
