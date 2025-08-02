package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Player;
import jakarta.validation.Valid;

public record PlayerCreationCharacteristicUpdateContext(@Valid Player player,
                                                        @Valid Characteristic characteristic) implements PlayerContext {
}
