package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.talent.Talent;
import jakarta.validation.Valid;

public record PlayerCreationTalentUpdateContext(@Valid Player player, @Valid Talent talent) {
}
