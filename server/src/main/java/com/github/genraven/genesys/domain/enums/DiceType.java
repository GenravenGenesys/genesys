package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum DiceType {
    BOOST("Boost"),
    SETBACK("Setback"),
    ABILITY("Ability"),
    DIFFICULTY("Difficulty"),
    PROFICIENCY("Proficiency"),
    CHALLENGE("Challenge");

    @JsonValue
    private final String label;
}
