package com.github.genraven.genesys.domain.campaign.encounter.dice;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum DiceSymbol {
    SUCCESS("Success"),
    ADVANTAGE("Advantage"),
    TRIUMPH("Triumph"),
    FAILURE("Failure"),
    THREAT("Threat"),
    DESPAIR("Despair"),
    BLANK("Blank");

    @JsonValue
    private final String label;
}
