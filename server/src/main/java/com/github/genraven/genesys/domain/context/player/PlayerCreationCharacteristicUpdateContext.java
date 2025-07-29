package com.github.genraven.genesys.domain.context.player;

import java.util.List;
import java.util.Optional;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Experience;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.validator.ValidationGroups;

public record PlayerCreationCharacteristicUpdateContext(Player player, Characteristic characteristic) implements PlayerContext {
    @Override
    public List<Object> getValidatableParts() {
        return List.of(player, characteristic);
    }

    @Override
    public List<Class<?>> getValidationGroups() {
        return List.of(ValidationGroups.PlayerValidation.class, ValidationGroups.PlayerCreationValidation.class);
    }

    @Override
    public List<String> validateAvailableExperience() {
        final Experience experience = player.getExperience();
        if (experience.getAvailable() <= 0 && experience.getInitial() <= 0) {

        }
        return List.of();
    }
}
