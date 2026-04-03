package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum CheckTarget {
    /**
     * Applies to the character's own rolls.
     */
    SELF("Self"),
    /**
     * Applies to rolls made against this character.
     */
    OPPONENT("Opponent");

    @JsonValue
    private final String label;
}
