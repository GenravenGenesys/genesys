package com.github.genraven.genesys.domain.actor.npc;

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
@Document(collection = "minions")
public class Minion extends NonPlayerActor {

    protected Minion() {}

    public Minion(final NonPlayerActor nonPlayerActor) {
        this.setName(nonPlayerActor.getName());
        this.setType(ActorType.MINION);
        this.setBrawn(nonPlayerActor.getBrawn());
        this.setAgility(nonPlayerActor.getAgility());
        this.setIntellect(nonPlayerActor.getIntellect());
        this.setCunning(nonPlayerActor.getCunning());
        this.setWillpower(nonPlayerActor.getWillpower());
        this.setPresence(nonPlayerActor.getPresence());
        this.setWounds(nonPlayerActor.getWounds());
        this.setCombat(nonPlayerActor.getCombat());
        this.setSocial(nonPlayerActor.getSocial());
        this.setGeneral(nonPlayerActor.getGeneral());
        this.setAbilities(nonPlayerActor.getAbilities());
        this.setWeapons(nonPlayerActor.getWeapons());
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<GroupSkill> skills = new ArrayList<>();
}
