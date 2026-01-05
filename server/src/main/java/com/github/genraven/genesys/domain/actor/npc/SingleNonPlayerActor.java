package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.actor.ActorSkill;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleNonPlayerActor extends NonPlayerActor {

    protected SingleNonPlayerActor() {}

    public SingleNonPlayerActor(final NonPlayerActor nonPlayerActor) {
        this.setName(nonPlayerActor.getName());
        this.setBrawn(nonPlayerActor.getBrawn());
        this.setAgility(nonPlayerActor.getAgility());
        this.setIntellect(nonPlayerActor.getIntellect());
        this.setCunning(nonPlayerActor.getCunning());
        this.setWillpower(nonPlayerActor.getWillpower());
        this.setPresence(nonPlayerActor.getPresence());
        this.setWounds(nonPlayerActor.getWounds());
        this.setMelee(nonPlayerActor.getMelee());
        this.setRanged(nonPlayerActor.getRanged());
        this.setCombat(nonPlayerActor.getCombat());
        this.setSocial(nonPlayerActor.getSocial());
        this.setGeneral(nonPlayerActor.getGeneral());
        this.setTalents(nonPlayerActor.getTalents());
        this.setAbilities(nonPlayerActor.getAbilities());
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ActorSkill> skills = new ArrayList<>();
}
