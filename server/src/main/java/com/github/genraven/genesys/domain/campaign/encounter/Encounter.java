package com.github.genraven.genesys.domain.campaign.encounter;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.actor.npc.MinionGroup;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.campaign.Party;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
public class Encounter {

    private Type type = Type.COMBAT;
    private Party party = new Party();
    private List<Rival> enemyRivals = new ArrayList<>();
    private List<Nemesis> enemyNemeses = new ArrayList<>();
    private List<MinionGroup> enemyMinionGroups = new ArrayList<>();
    private List<InitiativeSlot> slots = new ArrayList<>();

    @Getter
    @AllArgsConstructor
    public enum Type {
        COMBAT("Combat"),
        SOCIAL("Social");

        @JsonValue
        private final String label;
    }
}
