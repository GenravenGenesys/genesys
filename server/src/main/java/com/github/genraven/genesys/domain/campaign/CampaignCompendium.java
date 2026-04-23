package com.github.genraven.genesys.domain.campaign;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.adversary.AdversaryTemplate;
import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import com.github.genraven.genesys.domain.quality.Quality;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.domain.spell.Spell;
import com.github.genraven.genesys.domain.talent.Talent;
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

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Custom species or archetypes")
    private List<Archetype> archetypes = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Custom careers and career skills")
    private List<Career> careers = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific skills")
    private List<Skill> skills = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific talents")
    private List<Talent> talents = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific weapons, armor, and gear")
    private List<ItemTemplate> items = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific Nemeses, Rivals, and Minions")
    private List<AdversaryTemplate> adversaries = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific equipment qualities")
    private List<Quality> qualities = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific critical injuries")
    private List<CriticalInjury> criticalInjuries = List.of();

    @Builder.Default
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "Setting-specific spells")
    private List<Spell> spells = List.of();
}
