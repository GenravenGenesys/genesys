package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AdversaryType {
    MINION("Minion"),
    RIVAL("Rival"),
    NEMESIS("Nemesis");

    @JsonValue
    private final String label;
}
