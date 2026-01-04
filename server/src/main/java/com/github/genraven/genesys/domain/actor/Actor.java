package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.validator.EnumValidator;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @EnumValidator(enumClass = ActorType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ActorType type;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic brawn = new Characteristic(Characteristic.Type.BRAWN, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic agility = new Characteristic(Characteristic.Type.AGILITY, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic intellect = new Characteristic(Characteristic.Type.INTELLECT, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic cunning = new Characteristic(Characteristic.Type.CUNNING, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic willpower = new Characteristic(Characteristic.Type.WILLPOWER, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic presence = new Characteristic(Characteristic.Type.PRESENCE, 1);

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Stats wounds = new Stats(0, 1, Stats.Type.WOUNDS);

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int melee = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int ranged = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ActorWeapon> weapons = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
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
