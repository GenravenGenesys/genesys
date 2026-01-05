package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorTalent;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class NonPlayerActor extends Actor {

    protected NonPlayerActor() {
    }

    public NonPlayerActor(final Actor actor) {
        this.setName(actor.getName());
        this.setBrawn(actor.getBrawn());
        this.setAgility(actor.getAgility());
        this.setIntellect(actor.getIntellect());
        this.setCunning(actor.getCunning());
        this.setWillpower(actor.getWillpower());
        this.setPresence(actor.getPresence());
        this.setWounds(actor.getWounds());
        this.setMelee(actor.getMelee());
        this.setRanged(actor.getRanged());
        this.setWeapons(actor.getWeapons());
        this.setArmors(actor.getArmors());
    }

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int combat = 1;

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int social = 1;

    @Min(1)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int general = 1;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ActorTalent> talents = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Ability> abilities = new ArrayList<>();
}
