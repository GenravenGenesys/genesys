package com.github.genraven.gradlejavaserver.domain.actor.npc;

import com.github.genraven.gradlejavaserver.domain.Talent;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "minions")
public class MinionActor extends NonPlayerActor {

    protected MinionActor() {}

    public MinionActor(final NonPlayerActor nonPlayerActor) {
        this.setName(nonPlayerActor.getName());
        this.setBrawn(nonPlayerActor.getBrawn());
        this.setAgility(nonPlayerActor.getAgility());
        this.setIntellect(nonPlayerActor.getIntellect());
        this.setCunning(nonPlayerActor.getCunning());
        this.setWillpower(nonPlayerActor.getWillpower());
        this.setPresence(nonPlayerActor.getPresence());
        this.setWounds(nonPlayerActor.getWounds());
        this.setSettings(nonPlayerActor.getSettings());
        this.setCombat(nonPlayerActor.getCombat());
        this.setSocial(nonPlayerActor.getSocial());
        this.setGeneral(nonPlayerActor.getGeneral());
        this.setAbilities(nonPlayerActor.getAbilities());
        this.setWeapons(nonPlayerActor.getWeapons());
        this.setArmors(nonPlayerActor.getArmors());
    }

    private List<Talent> talents = new ArrayList<>();
    private List<GroupSkill> skills = new ArrayList<>();
}
