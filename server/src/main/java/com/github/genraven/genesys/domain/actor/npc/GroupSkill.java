package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupSkill extends Skill {

    protected GroupSkill() {}

    public GroupSkill(final Skill skill) {
        this.setId(skill.getId());
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
    }

    private boolean group;
}
