package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Schema(description = "The type of Motivation", example = "STRENGTH", enumAsRef = true)
public enum MotivationType {
    STRENGTH("Strength"),
    FLAW("Flaw"),
    DESIRE("Desire"),
    FEAR("Fear");

    @JsonValue
    @Schema(description = "The Human readable Label for Motivation type", example = "Strength")
    private final String label;
}
