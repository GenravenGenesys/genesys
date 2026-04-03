package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.enums.CheckContext;
import com.github.genraven.genesys.domain.enums.CheckTarget;
import com.github.genraven.genesys.domain.enums.Duration;
import com.github.genraven.genesys.domain.enums.SkillType;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class UpgradeModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The direction of the upgrade (ability→proficiency or difficulty→challenge)")
    private UpgradeType upgradeType;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Number of dice to upgrade")
    private int amount = 1;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The kind of check that triggers this modifier")
    private CheckContext checkContext;

    @Schema(description = "Restricts this modifier to checks of a particular skill type; null means any skill type")
    private SkillType skillType;

    @Schema(description = "Restricts this modifier to a specific skill; null means any skill matching skillType")
    private Skill skill;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Whether this modifier applies to the character's own rolls or to rolls made against them")
    private CheckTarget checkTarget;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "How long this upgrade effect lasts; PERMANENT means always active while equipped")
    private Duration duration = Duration.PERMANENT;

    // ── Enums ────────────────────────────────────────────────────────────────

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum UpgradeType {
        /** Converts an Ability die (green) to a Proficiency die (yellow). */
        ABILITY_TO_PROFICIENCY("Ability to Proficiency"),
        /** Converts a Difficulty die (purple) to a Challenge die (red). */
        DIFFICULTY_TO_CHALLENGE("Difficulty to Challenge");

        @JsonValue
        private final String label;
    }
}



