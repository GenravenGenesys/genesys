package com.github.genraven.genesys.domain.skill;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.validator.EnumValidator;

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
    private String id;

    @NotNull
    private String name;

    @EnumValidator(enumClass = Characteristic.Type.class)
    private Characteristic.Type characteristic = Characteristic.Type.BRAWN;

    @EnumValidator(enumClass = SkillType.class)
    private SkillType type = SkillType.GENERAL;

    @NotNull
    private boolean initiative = false;
}
