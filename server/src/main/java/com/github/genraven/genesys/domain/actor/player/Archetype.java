package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.skill.Skill;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "archetypes")
public class Archetype {

    protected Archetype() {
    }

    public Archetype(final String name) {
        this.name = name;
    }

    @Id
    private String id;

    @NotEmpty
    private String name;
    private String description;

    @Min(value = 1)
    @Max(value = 5)
    private int brawn = 1;

    @Min(value = 1)
    @Max(value = 5)
    private int agility = 1;

    @Min(value = 1)
    @Max(value = 5)
    private int intellect = 1;

    @Min(value = 1)
    @Max(value = 5)
    private int cunning = 1;

    @Min(value = 1)
    @Max(value = 5)
    private int willpower = 1;

    @Min(value = 1)
    @Max(value = 5)
    private int presence = 1;

    private int wounds = 10;

    private int strain = 10;

    @Min(value = 65)
    private int experience = 100;

    private Skill skill;

    private List<Ability> abilities = new ArrayList<>();
}
