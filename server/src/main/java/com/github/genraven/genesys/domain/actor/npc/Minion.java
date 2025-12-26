package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.equipment.Armor;
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
        this.setSoak(nonPlayerActor.getSoak());
        this.setCombat(nonPlayerActor.getCombat());
        this.setSocial(nonPlayerActor.getSocial());
        this.setGeneral(nonPlayerActor.getGeneral());
        this.setAbilities(nonPlayerActor.getAbilities());
        this.setWeapons(nonPlayerActor.getWeapons());
    }

    private List<GroupSkill> skills = new ArrayList<>();

    public void getTotalMinionStats() {
        this.getTotalSoak();
        this.getTotalMeleeDefense();
        this.getTotalRangedDefense();
    }

    private void getTotalSoak() {
        int soak = getBrawn().getCurrent();
        soak += getArmors().stream()
                .filter(armor -> armor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
                .mapToInt(Armor::getSoak)
                .sum();
        soak += getTalents().stream()
                .filter(talent -> talent.getTalentStats().getSoak() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getSoak() * talent.getRanks() : talent.getTalentStats().getSoak())
                .sum();
        this.setSoak(soak);
    }

    private void getTotalMeleeDefense() {
        int melee = 0;
        melee += getTalents().stream()
                .filter(talent -> talent.getTalentStats().getDefense() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks() : talent.getTalentStats().getDefense())
                .sum();
        melee += getArmors().stream()
                .filter(armor -> armor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
                .mapToInt(Armor::getDefense)
                .sum();
        this.setMelee(melee);
    }

    private void getTotalRangedDefense() {
        int ranged = 0;
        ranged += getTalents().stream()
                .filter(talent -> talent.getTalentStats().getDefense() > 0)
                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks() : talent.getTalentStats().getDefense())
                .sum();
        ranged += getArmors().stream()
                .filter(armor -> armor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
                .mapToInt(Armor::getDefense)
                .sum();
        this.setRanged(ranged);
    }
}
