package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.Player;
import jakarta.validation.Valid;

public record PlayerCreationResetExperienceContext(@Valid Player player) implements PlayerContext {
}
