package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PlayerSkill extends Skill {

    protected PlayerSkill() {}

    public PlayerSkill(final Skill skill) {
        this.setId(skill.getId());
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setInitiative(skill.isInitiative());
    }

    private int ranks = 0;
    private boolean career = false;
}
