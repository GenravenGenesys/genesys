package com.github.genraven.genesys.domain.spell;

import com.github.genraven.genesys.domain.Difficulty;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "spells")
public class Spell {

    protected Spell() {}

    public Spell(final String name) {
        this.name = name;
    }

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @NotNull
    private boolean concentration = false;

    @EnumValidator(enumClass = Difficulty.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty difficulty = Difficulty.EASY;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Skill> skills = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Effect> effects = new ArrayList<>();
}
