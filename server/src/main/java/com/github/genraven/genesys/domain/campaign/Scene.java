package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.domain.actor.npc.MinionGroup;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.campaign.encounter.Encounter;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "scenes")
public class Scene {
    protected Scene() {
    }

    public Scene(final String name) {
        this.name = name;
    }

    @Id
    private String id;

    @NotNull
    private String name;

    private Boolean active = false;

    private Party party = new Party();

    private List<Encounter> encounters = new ArrayList<>();

    private List<Rival> enemyRivals = new ArrayList<>();

    private List<Nemesis> enemyNemeses = new ArrayList<>();

    private List<MinionGroup> enemyMinionGroups = new ArrayList<>();
}
