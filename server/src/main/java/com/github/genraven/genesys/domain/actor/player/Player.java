package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.*;

import com.github.genraven.genesys.validator.ValidationGroups;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "players")
@Schema(allOf = { Actor.class })
public class Player extends Actor {

    protected Player() {
    }

    public Player(final String name) {
        this.setName(name);
        this.setType(ActorType.PLAYER);
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private OldStats strain = new OldStats(0, 1, OldStats.Type.STRAIN);

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int encumbrance;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Experience experience = new Experience();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Career career = new Career();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Archetype archetype = new Archetype();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ActorTalent> talents = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<PlayerSkill> skills = new ArrayList<>();

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CriticalInjury> injuries = new ArrayList<>();

    @AssertTrue(groups = ValidationGroups.PlayerCreationValidation.class)
    private Boolean creation = Boolean.TRUE;

    public void updateAvailableExperience(final int experience) {
        final Experience oldExperience = getExperience();
        oldExperience.setInitial(experience);
        oldExperience.setAvailable(experience);
        oldExperience.setTotal(experience);
        this.experience = oldExperience;
    }
}
