import {
    type ActorSkill,
    type AdversarySkill, type AdversaryTemplate,
    CharacteristicType,
    type PlayerCharacter,
    type PlayerSkill
} from "../api/model";
import type Actor from "../models/actor/Actor.ts";


export const getPlayerSkillCharacteristicRanks = (player: PlayerCharacter, skill: PlayerSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return player.characteristics.agility.current;
        case CharacteristicType.Brawn:
            return player.characteristics.brawn.current;
        case CharacteristicType.Cunning:
            return player.characteristics.cunning.current;
        case CharacteristicType.Intellect:
            return player.characteristics.intellect.current;
        case CharacteristicType.Presence:
            return player.characteristics.presence.current;
        case CharacteristicType.Willpower:
            return player.characteristics.willpower.current;
        default:
            return 0;
    }
};

export const getAdversaryCharacteristicRanks = (adversary: AdversaryTemplate, skill: AdversarySkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return adversary.characteristics.agility.current;
        case CharacteristicType.Brawn:
            return adversary.characteristics.brawn.current;
        case CharacteristicType.Cunning:
            return adversary.characteristics.cunning.current;
        case CharacteristicType.Intellect:
            return adversary.characteristics.intellect.current;
        case CharacteristicType.Presence:
            return adversary.characteristics.presence.current;
        case CharacteristicType.Willpower:
            return adversary.characteristics.willpower.current;
        default:
            return 0;
    }
};