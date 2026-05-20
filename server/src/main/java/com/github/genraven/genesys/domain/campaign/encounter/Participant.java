package com.github.genraven.genesys.domain.campaign.encounter;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.actor.Characteristics;
import com.github.genraven.genesys.domain.actor.DerivedStats;
import com.github.genraven.genesys.domain.actor.StatusEffect;
import com.github.genraven.genesys.domain.actor.Threshold;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "A participant (PC or NPC) taking part in an encounter")
public class Participant {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
            description = "Whether this participant is a player character or non-player character")
    private Type type;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The characteristics of the player")
    private Characteristics characteristics;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The stats of the player")
    private DerivedStats derivedStats;

    @Valid
    @Schema(description = "Active status effects currently applied to this participant")
    private List<StatusEffect> statusEffects = new ArrayList<>();

    @Schema(description = "URL of the participant's portrait or token image")
    private String imageUrl;

    @Schema(description = "Free-text notes about this participant")
    private String notes;

    @Valid
    @Schema(description = "Special abilities available to this participant")
    private List<Ability> abilities = new ArrayList<>();

    @Valid
    @Schema(description = "Skills possessed by this participant")
    private List<Skill> skills = new ArrayList<>();

    @Getter
    @AllArgsConstructor
    public enum Type {
        PC("pc"),
        NPC("npc");

        @JsonValue
        private final String label;
    }
}

