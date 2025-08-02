package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.validator.ValidationGroups;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Schema(description = "Player Skill Data")
public class PlayerSkill extends Skill {

    protected PlayerSkill() {}

    public PlayerSkill(final Skill skill) {
        this.setId(skill.getId());
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setInitiative(skill.isInitiative());
    }

    @Min(value = 0)
    @Max(value = 2, groups = ValidationGroups.PlayerCreationValidation.class)
    @Max(value = 5)
    private int ranks = 0;

    @NotNull
    private boolean career = false;
}
