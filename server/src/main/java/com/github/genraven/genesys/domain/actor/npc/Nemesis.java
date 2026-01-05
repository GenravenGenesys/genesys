package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.equipment.Armor;
import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Stats strain = new Stats(0, 1, Stats.Type.STRAIN);

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CriticalInjury> injuries = new ArrayList<>();
}
