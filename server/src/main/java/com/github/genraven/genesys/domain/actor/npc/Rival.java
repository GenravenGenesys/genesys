package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
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

    public Rival(final SingleNonPlayerActor singleNonPlayerActor) {
        this.setName(singleNonPlayerActor.getName());
        this.setType(ActorType.RIVAL);
        this.setBrawn(singleNonPlayerActor.getBrawn());
        this.setAgility(singleNonPlayerActor.getAgility());
        this.setIntellect(singleNonPlayerActor.getIntellect());
        this.setCunning(singleNonPlayerActor.getCunning());
        this.setWillpower(singleNonPlayerActor.getWillpower());
        this.setPresence(singleNonPlayerActor.getPresence());
        this.setWounds(singleNonPlayerActor.getWounds());
        this.setSoak(singleNonPlayerActor.getSoak());
        this.setCombat(singleNonPlayerActor.getCombat());
        this.setSocial(singleNonPlayerActor.getSocial());
        this.setGeneral(singleNonPlayerActor.getGeneral());
        this.setAbilities(singleNonPlayerActor.getAbilities());
        this.setSkills(singleNonPlayerActor.getSkills());
        this.setTalents(singleNonPlayerActor.getTalents());
        this.setWeapons(singleNonPlayerActor.getWeapons());
    }

    private List<CriticalInjury> injuries = new ArrayList<>();

    public void getTotalRivalStats() {
        this.getTotalSoak();
        this.getTotalMeleeDefense();
        this.getTotalRangedDefense();
    }

    private void getTotalSoak() {
        int soak = getBrawn().getCurrent();
        soak += getArmors().stream()
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
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
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
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
                .filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY))
                .mapToInt(Armor::getDefense)
                .sum();
        this.setRanged(ranged);
    }
}
