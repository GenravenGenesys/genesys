package com.github.genraven.genesys.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum LoreType {
    ORGANIZATION("Organization");

    @JsonValue
    private final String type;
}
