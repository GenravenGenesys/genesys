package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum Target {
    /** Applies to the performer themselves. */
    SELF("Self"),
    /** Applies to a direct opponent or roll made against this character. */
    OPPONENT("Opponent"),
    /** An ally who is at engaged range. */
    ENGAGED_ALLY("Engaged Ally"),
    /** An enemy who is at engaged range. */
    ENGAGED_ENEMY("Engaged Enemy"),
    /** Any ally within range. */
    ANY_ALLY("Any Ally"),
    /** Any enemy within range. */
    ANY_ENEMY("Any Enemy");

    @JsonValue
    private final String label;
}
