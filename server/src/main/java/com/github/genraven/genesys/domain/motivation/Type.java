package com.github.genraven.genesys.domain.motivation;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Schema(description = "Type of Motivation")
public enum Type {
    @Schema(description = "")
    FEAR("Fear"),
    @Schema(description = "")
    DESIRE("Desire"),
    @Schema(description = "")
    FLAW("Flaw"),
    @Schema(description = "")
    STRENGTH("Strength");

    @JsonValue
    private final String label;
}
