package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Party {

    @NotEmpty
    private List<PlayerCharacter> players = List.of();

    @Valid
    @Schema(requiredMode =  Schema.RequiredMode.REQUIRED)
    private List<AdversaryTemplate> adversaryTemplates = List.of();
}
