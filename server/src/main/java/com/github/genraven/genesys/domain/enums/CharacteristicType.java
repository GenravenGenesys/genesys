package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Schema(description = "The type of Characteristic", example = "BRAWN", enumAsRef = true)
public enum CharacteristicType {
    BRAWN("Brawn"),
    AGILITY("Agility"),
    INTELLECT("Intellect"),
    CUNNING("Cunning"),
    WILLPOWER("Willpower"),
    PRESENCE("Presence");

    @JsonValue
    @Schema(description = "The Human readable Label for Characteristic type", example = "Brawn")
    private final String label;
}
