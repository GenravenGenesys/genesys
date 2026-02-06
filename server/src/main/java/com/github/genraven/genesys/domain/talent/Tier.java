package com.github.genraven.genesys.domain.talent;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Tier {
    FIRST("First"),
    SECOND("Second"),
    THIRD("Third"),
    FOURTH("Fourth"),
    FIFTH("Fifth");

    @JsonValue
    private final String label;
}
