package com.github.genraven.genesys.domain.modifier;

import com.github.genraven.genesys.domain.actor.StatusEffect;
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
     * Characteristic bonuses while the item is equipped.
     * Examples:
     *   - Neuro-regulators: WILLPOWER, amount=+1
     *   - Cyberlimb (Brawn): BRAWN, amount=+1
     *   - Cyberlimb (Agility): AGILITY, amount=+1
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Characteristic bonuses applied while this item is equipped")
    private List<CharacteristicModifier> characteristicModifiers = new ArrayList<>();

    /**
     * Skill rank bonuses while the item is equipped.
     * Example:
     *   - Enhanced hearing: Vigilance, ranks=+1
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Skill rank bonuses applied while this item is equipped")
    private List<SkillRankModifier> skillRankModifiers = new ArrayList<>();

    /**
     * Numeric stat bonuses while the item is equipped.
     * Example:
     *   - Backpack: encumbranceThreshold=+4
     *   - Armor:    soak=+1
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Flat stat bonuses applied while this item is equipped")
    private StatModifiers statModifiers = new StatModifiers();

    // ── Drug / Consumable effects ─────────────────────────────────────────────

    /**
     * Immediate healing applied when this item is used.
     * Examples:
     *   - Happy Patch: STRAIN, FIXED, amount=3
     *   - Slap-Patch:  WOUNDS, FIXED, amount=5
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Healing applied to wounds or strain when this item is used")
    private List<HealEffect> healEffects = new ArrayList<>();

    /**
     * Status effects applied to the character when this item is used.
     * Example:
     *   - Happy Patch: DISORIENTED (for the remainder of the encounter)
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Status effects applied to the character when this item is used")
    private List<StatusEffect.Type> appliedStatusEffects = new ArrayList<>();

    /**
     * Wounds and strain suffered at the end of the encounter.
     * Example:
     *   - Sting: 4 wounds + 4 strain at end of encounter
     */
    @Schema(description = "Wounds and strain suffered at the end of the encounter; null means no after-encounter penalty")
    private AfterEncounterEffect afterEncounterEffect = null;

    /**
     * When true, the character ignores penalties from Critical Injuries for the
     * remainder of the encounter (at GM's discretion for severe injuries).
     * Example:
     *   - Sting
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Character ignores Critical Injury penalties on skill checks for the encounter")
    private boolean ignoreCriticalInjuryPenalties = false;

    /**
     * When true, each additional use of this item on the same day heals one fewer
     * wound (to a minimum of 0). A sixth use in a day has no effect.
     * Example:
     *   - Slap-Patch: first use heals 5, second heals 4, … sixth heals 0
     */
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Each subsequent use of this item on the same day heals one fewer wound (min 0)")
    private boolean diminishingReturnsHealing = false;

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

