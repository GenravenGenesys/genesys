package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Activation {
    PASSIVE("Passive"),
    ACTIVE_ACTION("Active (Action)"),
    ACTIVE_MANEUVER("Active (Maneuver)"),
    ACTIVE_INCIDENTAL("Active (Incidental)"),
    ACTIVE_INCIDENTAL_OUT_OF_TURN("Active (Incidental, Out of Turn)");

    @JsonValue
    private final String label;
}
