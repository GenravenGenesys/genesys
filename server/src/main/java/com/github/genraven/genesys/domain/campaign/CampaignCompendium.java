package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignCompendium {

    @Schema(description = "Custom species or archetypes")
    private List<Archetype> archetypes;

    @Schema(description = "Custom careers and career skills")
    private List<Career> careers;

//    @Schema(description = "Setting-specific skills")
//    private List<SkillTemplate> skills;
//
//    @Schema(description = "Setting-specific gear and weapons")
//    private List<ItemTemplate> items;
}
