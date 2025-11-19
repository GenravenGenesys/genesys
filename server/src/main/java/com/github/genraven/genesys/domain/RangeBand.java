package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "The distance between to points. This can apply to characters, equipment, talents, and abilities.")
public enum RangeBand {
    @Schema(description = "Engaged")
    ENGAGED("Engaged"),
    @Schema(description = "Short")
    SHORT("Short"),
    @Schema(description = "Medium")
    MEDIUM("Medium"),
    @Schema(description = "Long")
    LONG("Long"),
    @Schema(description = "Extreme")
    EXTREME("Extreme"),
    @Schema(description = "Strategic")
    STRATEGIC("Strategic");

    @JsonValue
    private final String label;
}
