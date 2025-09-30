package com.github.genraven.genesys.domain.context.player;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;

import java.util.List;

public record PlayerCreationCareerSkillUpdateContext(@Valid Player player, @Valid @Size(min = 4, max = 4) List<PlayerSkill> skills) implements BasePlayerContext {
}
