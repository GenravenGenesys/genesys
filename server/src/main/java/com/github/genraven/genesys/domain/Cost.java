package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Cost {

    @EnumValidator(enumClass = Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type = Type.NONE;

    @Min(0)
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
