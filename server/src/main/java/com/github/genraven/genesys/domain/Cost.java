package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Cost {

    private Type type = Type.NONE;

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
