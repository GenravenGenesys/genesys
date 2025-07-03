package com.github.genraven.genesys.domain.context;

import java.util.List;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Player;

import lombok.Value;

@Value
public class PlayerCharacteristicUpdateContext implements PlayerContext {
    Player player;
    Characteristic characteristic;

    @Override
    public List<Object> getValidatableParts() {
        return List.of(player, characteristic);
    }
}
