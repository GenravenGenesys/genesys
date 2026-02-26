package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Limit {

    @EnumValidator(enumClass = Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type = Type.NONE;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int limit = 0;

    @AllArgsConstructor
    @Getter
    public enum Type {
        NONE("None"),
        PER_ROUND("Per Round"),
        PER_ENCOUNTER("Per Encounter"),
        PER_SESSION("Per Session");

        @JsonValue
        private final String label;
    }
}
