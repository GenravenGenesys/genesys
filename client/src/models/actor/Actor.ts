import {ActorGear} from "../equipment/Gear";
import Character from '../campaign/encounter/Character';
import {
    type ActorArmor,
    type ActorWeapon,
    type Characteristic,
    CharacteristicType,
    type Skill,
    type Stats
} from "../../api/model";

export default interface Actor {
    id: string
    name: string,
    type: ActorType,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    wounds: Stats,
    soak: number,
    melee: number,
    ranged: number,
    weapons: ActorWeapon[],
    armors: ActorArmor[],
    gear: ActorGear[],
}

export interface ActorSkill extends Skill {
    ranks: number
}

export const getActorCharacteristicRanks = (actor: Actor, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return actor.agility.current;
        case CharacteristicType.Brawn:
            return actor.brawn.current;
        case CharacteristicType.Cunning:
            return actor.cunning.current;
        case CharacteristicType.Intellect:
            return actor.intellect.current;
        case CharacteristicType.Presence:
            return actor.presence.current;
        case CharacteristicType.Willpower:
            return actor.willpower.current;
        default:
            return 0;
    }
};

export const getCharacteristicRanks = (actor: Character, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return actor.agility.current;
        case CharacteristicType.Brawn:
            return actor.brawn.current;
        case CharacteristicType.Cunning:
            return actor.cunning.current;
        case CharacteristicType.Intellect:
            return actor.intellect.current;
        case CharacteristicType.Presence:
            return actor.presence.current;
        case CharacteristicType.Willpower:
            return actor.willpower.current;
        default:
            return 0;
    }
};

export enum ActorType {
    Minion = 'Minion',
    Rival = 'Rival',
    Nemesis = 'Nemesis',
    Player = 'Player'
}