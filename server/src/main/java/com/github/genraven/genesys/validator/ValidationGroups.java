package com.github.genraven.genesys.validator;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.equipment.Gear;

public final class ValidationGroups {

    private ValidationGroups() {}

    /**
     * Validates Values Specific to a {@link Player}.
     */
    public interface PlayerValidation {}

    /**
     * Validates a {@link Player} in still in Creation Mode.
     */
    public interface PlayerCreationValidation {}

    /**
     * Validates the {@link Gear} object.
     */
    public interface GearValidation {}

    /**
     * Validates Values Specific Starting a {@link Scene}.
     */
    public interface SceneStartValidation {}
}
