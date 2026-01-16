package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.actor.Characteristics;
import com.github.genraven.genesys.domain.actor.DerivedStats;
import com.github.genraven.genesys.domain.actor.adversary.AdversarySkill;
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
@Schema(description = "Setting-specific Player for a specific Campaign")
public class PlayerCharacter {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The characteristics of the player")
    private Characteristics characteristics;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The stats of the player")
    private DerivedStats derivedStats;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Weapons, armor, and gear of the player")
    private PlayerEquipment equipment;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Adversary Skills")
    private List<AdversarySkill> skills;
}
