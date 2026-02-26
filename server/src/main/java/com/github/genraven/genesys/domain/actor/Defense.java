package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class Defense {

    protected Defense() {}

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int current;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int temporary;

    @EnumValidator(enumClass = Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type;

    @AllArgsConstructor
    @Getter
    public enum Type {
        MELEE("Melee"),
        RANGED("Ranged");

        @JsonValue
        private final String label;
    }
}
