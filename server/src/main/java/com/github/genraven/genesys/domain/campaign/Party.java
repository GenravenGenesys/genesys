package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Party {

    @NotEmpty
    private List<PlayerCharacter> players = List.of();
}
