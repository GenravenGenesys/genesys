package com.github.genraven.gradlejavaserver.domain.character;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.CharacteristicType;
import lombok.Data;

@Data
public class Character {

    protected Character() {}

    public Character(final Actor actor) {
        this.setBrawn(new Characteristic(CharacteristicType.BRAWN, actor.getBrawn()));
        this.setAgility(new Characteristic(CharacteristicType.AGILITY, actor.getAgility()));
        this.setIntellect(new Characteristic(CharacteristicType.INTELLECT, actor.getIntellect()));
        this.setCunning(new Characteristic(CharacteristicType.CUNNING, actor.getCunning()));
        this.setWillpower(new Characteristic(CharacteristicType.WILLPOWER, actor.getWillpower()));
        this.setPresence(new Characteristic(CharacteristicType.PRESENCE, actor.getPresence()));
        this.setWounds(new Wounds(0, actor.getWounds()));
    }

    private Characteristic brawn;
    private Characteristic agility;
    private Characteristic intellect;
    private Characteristic cunning;
    private Characteristic willpower;
    private Characteristic presence;
    private Wounds wounds;
    private StatusEffect disoriented = new StatusEffect(StatusEffect.Type.DISORIENTED);
    private StatusEffect immobilized = new StatusEffect(StatusEffect.Type.IMMOBILIZED);
    private StatusEffect staggered = new StatusEffect(StatusEffect.Type.STAGGERED);
}
