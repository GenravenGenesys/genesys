package com.github.genraven.genesys.domain.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.ActorWeapon;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Experience;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Response DTO representing a Player")
public class PlayerResponse {

    @Schema(description = "Globally unique ID for this character", example = "4e90be2c-1f7d-4fc5-bac6-fd09a7d3902d")
    private String id;

    @Schema(description = "Character's name", example = "Aria Stormblade")
    private String name;

    @Schema(description = "Actor type", example = "PLAYER")
    private Actor.ActorType type;

    @Schema(description = "Brawn characteristic")
    private Characteristic brawn;

    @Schema(description = "Agility characteristic")
    private Characteristic agility;

    @Schema(description = "Intellect characteristic")
    private Characteristic intellect;

    @Schema(description = "Cunning characteristic")
    private Characteristic cunning;

    @Schema(description = "Willpower characteristic")
    private Characteristic willpower;

    @Schema(description = "Presence characteristic")
    private Characteristic presence;

    @Schema(description = "Wound stats (current and max)")
    private Stats wounds;

    @Schema(description = "Strain stats (current and max)")
    private Stats strain;

    @Schema(description = "Soak value", example = "5")
    private int soak;

    @Schema(description = "Melee defense value", example = "1")
    private int melee;

    @Schema(description = "Ranged defense value", example = "2")
    private int ranged;

    @Schema(description = "Encumbrance threshold", example = "9")
    private int encumbrance;

    @Schema(description = "Equipped weapons")
    private List<ActorWeapon> weapons;

    @Schema(description = "Equipped armor pieces")
    private List<ActorArmor> armors;

    @Schema(description = "Talents associated with the character")
    private List<ActorTalent> talents;

    @Schema(description = "Current critical injuries")
    private List<CriticalInjury> injuries;

    @Schema(description = "Skill ratings and expertise")
    private List<PlayerSkill> skills;

    @Schema(description = "Experience for players")
    private Experience experience;

    @Schema(description = "Career and selected Career Skills")
    private Career career;

    @Schema(description = "Archetype Information")
    private Archetype archetype;
}
