package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.equipment.Armor;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "rivals")
public class Rival extends SingleNonPlayerActor {

    protected Rival() {
    }

    public Rival(final String name) {
        this.setName(name);
        this.setType(ActorType.RIVAL);
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CriticalInjury> injuries = new ArrayList<>();
}
