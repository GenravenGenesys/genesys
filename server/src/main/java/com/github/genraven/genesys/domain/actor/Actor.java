package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.validator.EnumValidator;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = Player.class, name = "Player"),
    @JsonSubTypes.Type(value = Nemesis.class, name = "Nemesis"),
    @JsonSubTypes.Type(value = Rival.class, name = "Rival"),
    @JsonSubTypes.Type(value = Minion.class, name = "Minion")
})
@Schema(subTypes = { Player.class, Nemesis.class, Rival.class, Minion.class })
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
    private Characteristic brawn = new Characteristic(1, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic agility = new Characteristic(1, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic intellect = new Characteristic(1, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic cunning = new Characteristic(1, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic willpower = new Characteristic(1, 1);

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Characteristic presence = new Characteristic(1, 1);

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private OldStats wounds = new OldStats(0, 1, OldStats.Type.WOUNDS);

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int soak = 0;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int melee = 0;

    @Min(0)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int ranged = 0;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ActorWeapon> weapons = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ActorArmor> armors = new ArrayList<>();

    private List<Error> errors;

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
