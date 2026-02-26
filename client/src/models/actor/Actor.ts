import Character from '../campaign/encounter/Character';
import {
    type ActorArmor, type ActorSkill, type ActorType,
    type ActorWeapon,
    type Characteristic,
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
    wounds: {},
    soak: number,
    melee: number,
    ranged: number,
    weapons: ActorWeapon[],
    armors: ActorArmor[],
    // gear: ActorGear[],
}

export const getActorCharacteristicRanks = (actor: Actor, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        // case CharacteristicType.Agility:
        //     return actor.agility.current;
        // case CharacteristicType.Brawn:
        //     return actor.brawn.current;
        // case CharacteristicType.Cunning:
        //     return actor.cunning.current;
        // case CharacteristicType.Intellect:
        //     return actor.intellect.current;
        // case CharacteristicType.Presence:
        //     return actor.presence.current;
        // case CharacteristicType.Willpower:
        //     return actor.willpower.current;
        default:
            return 0;
    }
};

export const getCharacteristicRanks = (actor: Character, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        // case CharacteristicType.Agility:
        //     return actor.agility.current;
        // case CharacteristicType.Brawn:
        //     return actor.brawn.current;
        // case CharacteristicType.Cunning:
        //     return actor.cunning.current;
        // case CharacteristicType.Intellect:
        //     return actor.intellect.current;
        // case CharacteristicType.Presence:
        //     return actor.presence.current;
        // case CharacteristicType.Willpower:
        //     return actor.willpower.current;
        default:
            return 0;
    }
};