package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class Stats {

    protected Stats() {}

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int current;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int threshold;

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
