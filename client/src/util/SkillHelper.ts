import {CharacteristicType, type PlayerCharacter, type PlayerSkill} from "../api/model";


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