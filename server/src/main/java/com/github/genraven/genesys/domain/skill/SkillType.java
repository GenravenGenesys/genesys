package com.github.genraven.genesys.domain.skill;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(enumAsRef = true)
@AllArgsConstructor
@Getter
public enum SkillType {
    GENERAL("General"),
    MAGIC("Magic"),
    COMBAT("Combat"),
    SOCIAL("Social"),
    KNOWLEDGE("Knowledge");

    @JsonValue
    private final String label;
}
