package com.github.genraven.genesys.domain.campaign.encounter.dice;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum DiceRollType {
    INITIATIVE("Initiative"),
    ACTION("Action"),
    SKILL("Skill"),
    COMBAT("Combat");

    @JsonValue
    private final String label;
}