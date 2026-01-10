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
public class OldStats {

    protected OldStats() {}

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int current;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int threshold;

    @EnumValidator(enumClass = Defense.Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type;

    @AllArgsConstructor
    @Getter
    public enum Type {
        WOUNDS("Wounds"),
        STRAIN("Strain");

        @JsonValue
        private final String label;
    }
}
