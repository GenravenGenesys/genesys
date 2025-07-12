package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;

import java.util.List;

public record PlayerCreationSkillUpdateContext(Player player, PlayerSkill playerSkill) implements PlayerContext {
    @Override
    public List<Object> getValidatableParts() {
        return List.of(player, playerSkill);
    }

    @Override
    public List<Class<?>> getValidationGroups() {
        return List.of();
    }
}
