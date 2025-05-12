package com.github.genraven.genesys.domain.campaign;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Maneuver {

    protected Maneuver() {
    }

    public Maneuver(final String name) {
        this.name = name;
    }

    private String name;
    private Target target;

    @Getter
    @AllArgsConstructor
    public enum Target {
        SELF("Self"),
        ALLY("Ally"),
        ENEMY("Enemy");

        @JsonValue
        private final String label;
    }
}
