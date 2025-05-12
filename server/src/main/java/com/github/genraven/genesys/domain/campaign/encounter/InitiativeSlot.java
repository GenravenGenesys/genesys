package com.github.genraven.genesys.domain.campaign.encounter;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.campaign.Maneuver;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
public class InitiativeSlot {

    private Type type;
    private Character character;
    private List<Maneuver> maneuvers = new ArrayList<>();

    @Getter
    @AllArgsConstructor
    public enum Type {
        PLAYER("Player"),
        NPC("NPC");

        @JsonValue
        private final String label;
    }
}
