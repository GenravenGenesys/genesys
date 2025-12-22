package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@Getter
@AllArgsConstructor
public enum RangeBand {
    ENGAGED("Engaged"),
    SHORT("Short"),
    MEDIUM("Medium"),
    LONG("Long"),
    EXTREME("Extreme"),
    STRATEGIC("Strategic");

    @JsonValue
    private final String label;
}
