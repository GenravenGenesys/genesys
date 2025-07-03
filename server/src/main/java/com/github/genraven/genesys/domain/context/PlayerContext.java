package com.github.genraven.genesys.domain.context;

import java.util.List;

import com.github.genraven.genesys.domain.actor.player.Player;

public interface PlayerContext {
    Player getPlayer();

    List<Object> getValidatableParts();
}
