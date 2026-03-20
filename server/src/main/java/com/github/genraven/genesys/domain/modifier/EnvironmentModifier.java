package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class EnvironmentModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The environment in which this modifier applies")
    private EnvironmentType environment = EnvironmentType.ZERO_GRAVITY;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "The effect or immunity granted in that environment")
    private EnvironmentEffect effect = EnvironmentEffect.IGNORE_DIFFICULT_TERRAIN;

    // ── Enums ────────────────────────────────────────────────────────────────

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum EnvironmentType {
        ZERO_GRAVITY("Zero Gravity"),
        VACUUM("Vacuum"),
        UNDERWATER("Underwater"),
        EXTREME_HEAT("Extreme Heat"),
        EXTREME_COLD("Extreme Cold");

        @JsonValue
        private final String label;
    }

    @Schema(enumAsRef = true)
    @AllArgsConstructor
    @Getter
    public enum EnvironmentEffect {
        IGNORE_DIFFICULT_TERRAIN("Ignore Difficult Terrain"),
        IGNORE_ENVIRONMENTAL_PENALTIES("Ignore Environmental Penalties");

        @JsonValue
        private final String label;
    }
}

