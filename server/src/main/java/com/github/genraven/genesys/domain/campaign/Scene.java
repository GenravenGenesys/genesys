package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.domain.actor.npc.MinionGroup;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.campaign.encounter.Encounter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotEmpty;
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
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @NotNull
    private Boolean active = false;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Party party = new Party();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Encounter> encounters = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Rival> enemyRivals = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Nemesis> enemyNemeses = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<MinionGroup> enemyMinionGroups = new ArrayList<>();
}
