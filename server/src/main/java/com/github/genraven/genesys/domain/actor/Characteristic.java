package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class Characteristic {
    protected Characteristic() {}
    private Type type;
    private int current;

    @AllArgsConstructor
    @Getter
    public enum Type {
        BRAWN("Brawn"),
        AGILITY("Agility"),
        INTELLECT("Intellect"),
        CUNNING("Cunning"),
        WILLPOWER("Willpower"),
        PRESENCE("Presence");

        @JsonValue
        private final String label;
    }
}
