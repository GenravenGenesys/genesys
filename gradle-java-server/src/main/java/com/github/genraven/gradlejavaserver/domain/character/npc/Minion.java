package com.github.genraven.gradlejavaserver.domain.character.npc;

import com.github.genraven.gradlejavaserver.domain.actor.npc.MinionActor;
import com.github.genraven.gradlejavaserver.domain.character.Character;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Minion extends Character {

    protected Minion() {}

    public Minion(final MinionActor minionActor) {

    }
}
