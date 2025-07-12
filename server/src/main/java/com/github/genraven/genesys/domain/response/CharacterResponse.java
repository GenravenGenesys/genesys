package com.github.genraven.genesys.domain.response;

import java.util.ArrayList;
import java.util.List;

import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorArmor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.ActorWeapon;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.StatusEffect;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Response DTO representing any character type: Player, Nemesis, Rival, or MinionGroup")
public class CharacterResponse {

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

    @Schema(description = "Special abilities the character possesses")
    private List<Ability> abilities;

    @Schema(description = "Talents associated with the character")
    private List<ActorTalent> talents;

    @Schema(description = "Current critical injuries")
    private List<CriticalInjury> injuries;

    @Schema(description = "Skill ratings and expertise")
    private List<ActorSkill> skills;

    @Schema(description = "Status effects currently active")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<StatusEffect> effects = new ArrayList<>();

    @Schema(description = "Number of Minions in the Minion Group", example = "1")
    private int size;
}