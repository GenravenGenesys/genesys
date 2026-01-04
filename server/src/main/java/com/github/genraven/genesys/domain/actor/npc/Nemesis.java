package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.equipment.Armor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "nemeses")
public class Nemesis extends SingleNonPlayerActor {

    protected Nemesis() {}

    public Nemesis(final SingleNonPlayerActor singleNonPlayerActor) {
        this.setName(singleNonPlayerActor.getName());
        this.setType(ActorType.NEMESIS);
        this.setBrawn(singleNonPlayerActor.getBrawn());
        this.setAgility(singleNonPlayerActor.getAgility());
        this.setIntellect(singleNonPlayerActor.getIntellect());
        this.setCunning(singleNonPlayerActor.getCunning());
        this.setWillpower(singleNonPlayerActor.getWillpower());
        this.setPresence(singleNonPlayerActor.getPresence());
        this.setWounds(singleNonPlayerActor.getWounds());
        this.setCombat(singleNonPlayerActor.getCombat());
        this.setSocial(singleNonPlayerActor.getSocial());
        this.setGeneral(singleNonPlayerActor.getGeneral());
        this.setAbilities(singleNonPlayerActor.getAbilities());
        this.setSkills(singleNonPlayerActor.getSkills());
        this.setTalents(singleNonPlayerActor.getTalents());
        this.setWeapons(singleNonPlayerActor.getWeapons());
    }
    private Stats strain = new Stats(0, 1, Stats.Type.STRAIN);
    private List<CriticalInjury> injuries = new ArrayList<>();

//    public void getTotalNemesisStats() {
//        this.getTotalSoak();
//        this.getTotalMeleeDefense();
//        this.getTotalRangedDefense();
//    }
//
//    private void getTotalSoak() {
//        int soak = getBrawn().getCurrent();
//        soak += getArmors().stream()
//                .filter(armor -> armor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//                .mapToInt(Armor::getSoak)
//                .sum();
//        soak += getTalents().stream()
//                .filter(talent -> talent.getTalentStats().getSoak() > 0)
//                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getSoak() * talent.getRanks() : talent.getTalentStats().getSoak())
//                .sum();
//        this.setSoak(soak);
//    }
//
//    private void getTotalMeleeDefense() {
//        int melee = 0;
//        melee += getTalents().stream()
//                .filter(talent -> talent.getTalentStats().getDefense() > 0)
//                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks() : talent.getTalentStats().getDefense())
//                .sum();
//        melee += getArmors().stream()
//                .filter(armor -> armor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//                .mapToInt(Armor::getDefense)
//                .sum();
//        this.setMelee(melee);
//    }
//
//    private void getTotalRangedDefense() {
//        int ranged = 0;
//        ranged += getTalents().stream()
//                .filter(talent -> talent.getTalentStats().getDefense() > 0)
//                .mapToInt(talent -> talent.isRanked() ? talent.getTalentStats().getDefense() * talent.getRanks() : talent.getTalentStats().getDefense())
//                .sum();
//        ranged += getArmors().stream()
//                .filter(armor -> armor.getSlot().equals(ActorArmor.ArmorSlot.BODY))
//                .mapToInt(Armor::getDefense)
//                .sum();
//        this.setRanged(ranged);
//    }
}
