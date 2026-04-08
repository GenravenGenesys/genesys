import {
    type AdversarySkill, type AdversaryTemplate,
    CharacteristicType,
    DiceType,
    type PlayerCharacter,
    type PlayerSkill
} from "../api/model";


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

export const getGearDiceModifierCount = (player: PlayerCharacter, skill: PlayerSkill, diceType: DiceType): number => {
    const allGear = [
        ...(player.equipment?.otherGear ?? []),
        ...(player.equipment?.weapons ?? []),
    ];
    return allGear.reduce((total, item) => {
        const modifiers = item.gearModifiers?.diceModifiers ?? [];
        return total + modifiers
            .filter(mod =>
                mod.diceType === diceType &&
                mod.checkTarget === CheckTarget.Self &&
                (mod.skillType === null || mod.skillType === undefined || mod.skillType === skill.type) &&
                (mod.skill === null || mod.skill === undefined || mod.skill.id === skill.id)
            )
            .reduce((sum, mod) => sum + mod.amount, 0);
    }, 0);
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