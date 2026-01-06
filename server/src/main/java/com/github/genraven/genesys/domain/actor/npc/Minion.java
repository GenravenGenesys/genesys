package com.github.genraven.genesys.domain.actor.npc;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "minions")
public class Minion extends NonPlayerActor {

    protected Minion() {}

    public Minion(final String name) {
        this.setName(name);
        this.setType(ActorType.MINION);
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<GroupSkill> skills = new ArrayList<>();
}
