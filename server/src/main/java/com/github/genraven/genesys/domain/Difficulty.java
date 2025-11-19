package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "The task's inherent challenge to complete.")
public enum Difficulty {
    EASY("Easy"),
    AVERAGE("Average"),
    HARD("Hard"),
    DAUNTING("Daunting"),
    FORMIDABLE("Formidable");

    @JsonValue
    private final String label;
}
