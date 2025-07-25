package com.github.genraven.genesys.domain.context.player;

import java.util.List;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.validator.ValidationGroups;

public interface PlayerContext {
    Player player();

    List<Object> getValidatableParts();

    default List<Class<?>> getValidationGroups() {
        return List.of(ValidationGroups.PlayerValidation.class);
    }
}
