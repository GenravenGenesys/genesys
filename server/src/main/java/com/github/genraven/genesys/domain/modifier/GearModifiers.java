package com.github.genraven.genesys.domain.modifier;

import com.github.genraven.genesys.domain.enums.RangeBand;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GearModifiers {

    /**
     * Dice added to or removed from rolls, optionally scoped to a specific skill.
     * Examples:
     *   - Climbing gear:    SETBACK, amount=-1, context=ALL, skillType=GENERAL, skillName="Athletics", target=SELF
     *   - Fine cloak:       SETBACK, amount=-1, context=ALL, skillType=SOCIAL,   skillName="Charm",     target=SELF
     *                       SETBACK, amount=-1, context=ALL, skillType=SOCIAL,   skillName="Deception",  target=SELF
     *                       SETBACK, amount=-1, context=ALL, skillType=SOCIAL,   skillName="Leadership", target=SELF
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Dice added to or removed from rolls based on check context and optional skill filter")
    private List<DiceModifier> diceModifiers = new ArrayList<>();

    /**
     * Fixed results added to a check.
     * Example:
     *   - Lockpicking tools: {advantage=1}, context=DIRECT, skillType=GENERAL, skillName="Skulduggery", target=SELF
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Fixed results added to rolls based on check context and optional skill filter")
    private List<ResultsModifier> resultsModifiers = new ArrayList<>();

    /**
     * Dice pool upgrades (ability→proficiency or difficulty→challenge), optionally time-limited.
     * Example:
     *   - Bottled courage: ABILITY_TO_PROFICIENCY, amount=1, context=ALL, skillType=GENERAL,
     *                      skillName="Discipline", target=SELF, duration=SCENE
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Dice upgrades applied to rolls, with optional duration limit")
    private List<UpgradeModifier> upgradeModifiers = new ArrayList<>();

    /**
     * Numeric stat bonuses while the item is equipped.
     * Example:
     *   - Backpack: encumbranceThreshold=+4
     *   - Armor:    soak=+1
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Flat stat bonuses applied while this item is equipped")
    private StatModifiers statModifiers = new StatModifiers();

    /**
     * Override for the item's encumbrance value while it is being worn/carried.
     * {@code null} means the item's normal {@code encumbrance} value applies.
     * Example:
     *   - Fine cloak: equippedEncumbranceOverride=0 (weightless while worn)
     */
    @Schema(description = "Overrides the item's encumbrance while worn; null means use the item's normal encumbrance")
    private Integer equippedEncumbranceOverride = null;

    /**
     * The effective range of this gear item's effect, if applicable.
     * {@code null} means the item has no range limitation.
     * Example:
     *   - Lit lantern: SHORT (provides light out to short range)
     */
    @Schema(description = "The effective range of this gear item's effect; null means no range limitation")
    private RangeBand range = null;
}

