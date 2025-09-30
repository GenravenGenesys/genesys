package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Player;
import jakarta.validation.Valid;

public record PlayerCreationArchetypeUpdateContext(@Valid Player player, @Valid Archetype archetype) implements BasePlayerContext {
}
