package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.Stats;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class MinionGroup extends SingleNonPlayerActor {
    protected MinionGroup() {
    }

    public MinionGroup(final Minion minion, final int size) {
        minion.getTotalMinionStats();

        this.setName(minion.getName());
        this.setType(ActorType.MINION);
        this.setBrawn(minion.getBrawn());
        this.setAgility(minion.getAgility());
        this.setIntellect(minion.getIntellect());
        this.setCunning(minion.getCunning());
        this.setWillpower(minion.getWillpower());
        this.setPresence(minion.getPresence());
        this.setSoak(minion.getSoak());
        this.setCombat(minion.getCombat());
        this.setSocial(minion.getSocial());
        this.setGeneral(minion.getGeneral());
        this.setAbilities(minion.getAbilities());
        this.setWeapons(minion.getWeapons());
        this.setArmors(minion.getArmors());
        this.setTalents(minion.getTalents());
        // Minion Group Size Changes
        this.setWounds(new Stats(0, minion.getWounds().getThreshold() * size, Stats.Type.WOUNDS));
        this.setSkills(adaptGroupSkillsToActorSkills(minion.getSkills(), size));
        this.setSize(size);
    }

    private int size = 3;

    public static List<ActorSkill> adaptGroupSkillsToActorSkills(final List<GroupSkill> groupSkills, final int size) {
        final List<ActorSkill> actorSkills = new ArrayList<>();
        groupSkills.forEach(skill -> {
            final ActorSkill actorSkill = new ActorSkill(skill);
            if (skill.isGroup() && size > 1) {
                actorSkill.setRanks(size - 1);
            }
            actorSkills.add(actorSkill);
        });
        return actorSkills;
    }
}
