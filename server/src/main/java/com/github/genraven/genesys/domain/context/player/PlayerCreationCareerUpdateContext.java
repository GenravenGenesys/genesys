package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import jakarta.validation.Valid;

public record PlayerCreationCareerUpdateContext(@Valid Player player, @Valid Career career) implements PlayerContext {
}
