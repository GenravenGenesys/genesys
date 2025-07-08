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

import lombok.Data;

@Data
public class CharacterResponse {
    
    private String id;
    private String name;
    private Actor.ActorType type;
    private Characteristic brawn;
    private Characteristic agility;
    private Characteristic intellect;
    private Characteristic cunning;
    private Characteristic willpower;
    private Characteristic presence;
    private Stats wounds;
    private Stats strain;
    private int soak;
    private int melee;
    private int ranged;
    private int encumbrance;
    private List<ActorWeapon> weapons;
    private List<ActorArmor> armors;
    private List<Ability> abilities;
    private List<ActorTalent> talents;
    private List<CriticalInjury> injuries;
    private List<ActorSkill> skills;
    private List<StatusEffect> effects = new ArrayList<>();

    private int size;
}
