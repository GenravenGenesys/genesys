package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.enums.SkillType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class DiceModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The type of die to add to the pool")
    private DiceType diceType = DiceType.BOOST;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Number of dice to add")
    private int amount = 1;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The kind of check that triggers this modifier")
    private CheckContext checkContext = CheckContext.ALL;

    @Schema(description = "Restricts this modifier to checks of a particular skill type; null means any skill type")
    private SkillType skillType;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Whether this modifier applies to the character's own rolls or to rolls made against them")
    private CheckTarget checkTarget = CheckTarget.SELF;

    // ── Enums ────────────────────────────────────────────────────────────────

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum DiceType {
        BOOST("Boost"),
        SETBACK("Setback"),
        ADVANTAGE("Advantage"),
        THREAT("Threat"),
        SUCCESS("Success"),
        FAILURE("Failure"),
        TRIUMPH("Triumph"),
        DESPAIR("Despair");

        @JsonValue
        private final String label;
    }

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum CheckContext {
        ALL("All"),
        OPPOSED("Opposed"),
        DIRECT("Direct");

        @JsonValue
        private final String label;
    }

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum CheckTarget {
        /** Applies to the character's own rolls. */
        SELF("Self"),
        /** Applies to rolls made against this character. */
        OPPONENT("Opponent");

        @JsonValue
        private final String label;
    }
}

