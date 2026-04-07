package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum Duration {
    PERMANENT("Permanent"),
    SCENE("Scene"),
    ENCOUNTER("Encounter"),
    END_OF_NEXT_TURN("End of Next Turn"),
    NEXT_CHECK("Next Check"),
    NEXT_TURN("Next Turn");

    @JsonValue
    private final String label;
}

