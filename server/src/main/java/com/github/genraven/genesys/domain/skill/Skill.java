package com.github.genraven.genesys.domain.skill;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.validator.EnumValidator;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "skills")
public class Skill {

    public Skill(final String name) {
        this.name = name;
    }

    protected Skill() {
    }

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @EnumValidator(enumClass = Characteristic.Type.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic.Type characteristic = Characteristic.Type.BRAWN;

    @EnumValidator(enumClass = SkillType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private SkillType type = SkillType.GENERAL;

    @NotNull
    private boolean initiative = false;
}
