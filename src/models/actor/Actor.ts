import {CharacteristicType} from '../character/Characteristic';
import Skill from "./Skill";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import {ActorGear} from "../equipment/Gear";
import Setting from "../Setting";

export default interface Actor {
    actor_id: number,
    name: string,
    type: ActorType,
    brawn: number,
    agility: number,
    intellect: number,
    cunning: number,
    willpower: number,
    presence: number,
    wounds: number,
    weapons: ActorWeapon[],
    armors: ActorArmor[],
    gear: ActorGear[],
    settings: Setting[]
}

export interface ActorSkill extends Skill {
    ranks: number
}

export const setSkillName = (skill: Skill): string => {
    return skill.name + '(' + skill.characteristic + ')'
}

export const getCharacteristicRanks = (actor: Actor, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return actor.agility
        case CharacteristicType.Brawn:
            return actor.brawn
        case CharacteristicType.Cunning:
            return actor.cunning
        case CharacteristicType.Intellect:
            return actor.intellect
        case CharacteristicType.Presence:
            return actor.presence
        case CharacteristicType.Willpower:
            return actor.willpower
    }
}

export enum ActorType {
    Minion = 'Minion',
    Rival = 'Rival',
    Nemesis = 'Nemesis',
    Player = 'Player'
}

export enum ActorKey {
    Agility = 'agility',
    Brawn = 'brawn',
    Cunning = 'cunning',
    Intellect = 'intellect',
    Melee = 'melee',
    Name = 'name',
    Presence = 'presence',
    Ranged = 'ranged',
    Soak = 'soak',
    Talents = 'talents',
    Willpower = 'willpower',
    Wounds = 'wounds',
    Strain = 'strain',
    Skills = 'skills'
}