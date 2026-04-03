package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.enums.CharacteristicType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class HealEffect {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "What is healed — wounds or strain")
    private HealTarget target = HealTarget.STRAIN;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "What determines the amount healed")
    private HealSource source = HealSource.FIXED;

    @Schema(description = "Amount healed when source is FIXED")
    private int amount = 0;

    @Schema(description = "Characteristic whose current rank equals the amount healed; only used when source is CHARACTERISTIC")
    private CharacteristicType characteristic;

    // ── Enums ────────────────────────────────────────────────────────────────

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum HealTarget {
        WOUNDS("Wounds"),
        STRAIN("Strain");

        @JsonValue
        private final String label;
    }

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum HealSource {
        /** A fixed numeric amount defined by the {@code amount} field. */
        FIXED("Fixed"),
        /** Amount equals the character's number of cybernetic implants. */
        CYBERNETICS("Cybernetics"),
        /** Amount equals the rank of the characteristic set in {@code characteristic}. */
        CHARACTERISTIC("Characteristic");

        @JsonValue
        private final String label;
    }
}

