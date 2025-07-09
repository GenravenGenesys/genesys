package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorSkill extends Skill {

    protected ActorSkill() {}

    public ActorSkill(final Skill skill) {
        this.setId(skill.getId());
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setInitiative(skill.isInitiative());
    }

    public ActorSkill(final PlayerSkill skill) {
        this.setId(skill.getId());
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setInitiative(skill.isInitiative());
        this.setRanks(skill.getRanks());
    }

    private int ranks = 0;
}
