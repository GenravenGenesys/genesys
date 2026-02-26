package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class StatusEffect {

    protected StatusEffect() {}

    public StatusEffect(final Type type) {
        this.type = type;
    }

    @EnumValidator(enumClass = Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Type type;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int rounds = 0;

    @Getter
    @AllArgsConstructor
    public enum Type {
        DISORIENTED("Disoriented"),
        IMMOBILIZED("Immobilized"),
        STAGGERED("Staggered");

        @JsonValue
        private final String label;
    }
}
