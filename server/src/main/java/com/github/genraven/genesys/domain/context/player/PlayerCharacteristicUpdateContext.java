package com.github.genraven.genesys.domain.context.player;

import java.util.List;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Player;

public record PlayerCharacteristicUpdateContext(Player player, Characteristic characteristic) implements PlayerContext {
    @Override
    public List<Object> getValidatableParts() {
        return List.of(player, characteristic);
    }
}
