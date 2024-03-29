package com.github.genraven.gradlejavaserver.domain.actor.player;

import com.github.genraven.gradlejavaserver.domain.actor.ActorSkill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PlayerSkill extends ActorSkill {

    protected PlayerSkill() {}

    public PlayerSkill(final ActorSkill skill) {
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setSettings(skill.getSettings());
        this.setRanks(skill.getRanks());
    }

    private boolean career = false;
}
