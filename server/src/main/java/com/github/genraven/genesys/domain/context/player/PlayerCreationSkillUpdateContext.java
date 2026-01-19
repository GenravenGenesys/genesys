package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.OldPlayerSkill;
import com.github.genraven.genesys.domain.actor.player.Player;
import jakarta.validation.Valid;

public record PlayerCreationSkillUpdateContext(@Valid Player player,
                                               @Valid OldPlayerSkill oldPlayerSkill) implements BasePlayerContext {
}
