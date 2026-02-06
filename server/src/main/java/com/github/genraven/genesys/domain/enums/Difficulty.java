package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@Getter
@AllArgsConstructor
public enum Difficulty {
    EASY("Easy"),
    AVERAGE("Average"),
    HARD("Hard"),
    DAUNTING("Daunting"),
    FORMIDABLE("Formidable");

    @JsonValue
    private final String label;
}
