package com.github.genraven.genesys.domain.spell;

import com.github.genraven.genesys.domain.Difficulty;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.EnumValidator;
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
    private String id;

    private String name;

    private boolean concentration = false;

    @EnumValidator(enumClass = Difficulty.class)
    private Difficulty difficulty = Difficulty.EASY;

    private String description;

    private List<Skill> skills = new ArrayList<>();

    private List<Effect> effects = new ArrayList<>();
}
