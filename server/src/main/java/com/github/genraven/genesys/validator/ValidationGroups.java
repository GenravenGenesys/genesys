package com.github.genraven.genesys.validator;

import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;

public final class ValidationGroups {

    private ValidationGroups() {}

//    /**
//     * Validates Values Specific to a {@link Player}.
//     */
//    public interface PlayerValidation {}

    /**
     * Validates a {@link PlayerCharacter} in still in Creation Mode.
     */
    public interface PlayerCreationValidation {}
//
//    /**
//     * Validates Values Specific Starting a {@link Scene}.
//     */
//    public interface SceneStartValidation {}
}
