package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.skill.Skill;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "careers")
public class Career {

    protected Career() {
    }

    public Career(final String name) {
        this.name = name;
    }

    @Id
    private String id;

    @NotEmpty
    private String name;

    private List<Skill> skills = new ArrayList<>();
}
