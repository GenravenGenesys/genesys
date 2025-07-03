package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Actor {

    protected Actor() {
    }

    public Actor(final String name) {
        this.name = name;
    }

    @Id
    private String id;
    private String name;
    @EnumValidator(enumClass = ActorType.class)
    private ActorType type;
    @Valid
    private Characteristic brawn = new Characteristic(Characteristic.Type.BRAWN, 1);
    @Valid
    private Characteristic agility = new Characteristic(Characteristic.Type.AGILITY, 1);
    @Valid
    private Characteristic intellect = new Characteristic(Characteristic.Type.INTELLECT, 1);
    @Valid
    private Characteristic cunning = new Characteristic(Characteristic.Type.CUNNING, 1);
    @Valid
    private Characteristic willpower = new Characteristic(Characteristic.Type.WILLPOWER, 1);
    @Valid
    private Characteristic presence = new Characteristic(Characteristic.Type.PRESENCE, 1);
    private Stats wounds = new Stats(0, 1, Stats.Type.WOUNDS);
    private int soak = getBrawn().getCurrent();
    private int melee = 0;
    private int ranged = 0;
    private List<ActorWeapon> weapons = new ArrayList<>();
    private List<ActorArmor> armors = new ArrayList<>();

    @AllArgsConstructor
    @Getter
    public enum ActorType {
        MINION("Minion"),
        RIVAL("Rival"),
        NEMESIS("Nemesis"),
        PLAYER("Player");

        @JsonValue
        private final String label;
    }
}
