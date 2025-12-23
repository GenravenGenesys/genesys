package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Cost {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type = Type.NONE;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int amount = 0;

    @AllArgsConstructor
    @Getter
    public enum Type {
        NONE("None"),
        STRAIN("Strain"),
        STORY_POINT("Story Point");

        @JsonValue
        private final String label;
    }
}
