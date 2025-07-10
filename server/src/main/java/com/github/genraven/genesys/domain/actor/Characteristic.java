package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import com.github.genraven.genesys.validator.ValidationGroups.PlayerValidation;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Schema(description = "Characteristic Stat")
public class Characteristic {
    protected Characteristic() {
    }

    @EnumValidator(enumClass = Type.class)
    @Schema(description = "Characteristic type", example = "BRAWN")
    private Type type;

    @Min(value = 1)
    @Max(value = 5, groups = PlayerValidation.class)
    @Schema(description = "Current value of the Characteristic", example = "2")
    private int current;

    @AllArgsConstructor
    @Getter
    @Schema(description = "The type of Characteristic", example = "BRAWN")
    public enum Type {
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
}
