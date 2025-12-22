package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Limit {

    private Type type = Type.NONE;

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
