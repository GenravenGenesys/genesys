import {boostDie} from "./Boost";
import {setbackDie} from "./Setback";
import {abilityDie} from "./Ability";
import {difficultyDie} from "./Difficulty";
import {proficiencyDie} from "./Proficiency";
import {challengeDie} from "./Challenge";
import {Die} from "./Die";
import {ActorSkill, getActorCharacteristicRanks, getCharacteristicRanks} from "../../actor/Actor";
import {SingleNonPlayerCharacter} from "../../actor/npc/NonPlayerActor";
import Character from "../../campaign/encounter/Character";

export const dicePoolToRoll = (dicePool: DicePool): Die[] => [
    ...Array(dicePool.boost).fill(boostDie),
    ...Array(dicePool.setback).fill(setbackDie),
    ...Array(dicePool.ability).fill(abilityDie),
    ...Array(dicePool.difficulty).fill(difficultyDie),
    ...Array(dicePool.proficiency).fill(proficiencyDie),
    ...Array(dicePool.challenge).fill(challengeDie)
];

export const diceToRoll = (boost: number, setback: number, ability: number, difficulty: number, proficiency: number, challenge: number): Die[] => [
    ...Array(boost).fill(boostDie),
    ...Array(setback).fill(setbackDie),
    ...Array(ability).fill(abilityDie),
    ...Array(difficulty).fill(difficultyDie),
    ...Array(proficiency).fill(proficiencyDie),
    ...Array(challenge).fill(challengeDie)
];

export default interface DicePool {
    boost: number
    setback: number
    ability: number
    difficulty: number
    proficiency: number
    challenge: number
}

interface Dice {
    boost?: number,
    setback?: number,
    ability?: number,
    difficulty?: number,
    proficiency?: number,
    challenge?: number,
}

export const basicDicePool = (dice: Dice) => {
    const {boost, setback, ability, difficulty, proficiency, challenge} = dice;
    return {
        boost: boost || 0,
        setback: setback || 0,
        ability: ability || 0,
        difficulty: difficulty || 0,
        proficiency: proficiency || 0,
        challenge: challenge || 0,
    }
}

export const basicSkillDicePool = (actor: SingleNonPlayerCharacter, skill: ActorSkill): Die[] => {
    return dicePoolToRoll(basicDicePool({
        ability: Math.max(getActorCharacteristicRanks(actor, skill), skill.ranks) - Math.min(getActorCharacteristicRanks(actor, skill), skill.ranks),
        proficiency: Math.min(getActorCharacteristicRanks(actor, skill), skill.ranks)
    }));
};

export const characterSkillDicePool = (actor: Character, skill: ActorSkill): Die[] => {
    return dicePoolToRoll(basicDicePool({
        ability: Math.max(getCharacteristicRanks(actor, skill), skill.ranks) - Math.min(getCharacteristicRanks(actor, skill), skill.ranks),
        proficiency: Math.min(getCharacteristicRanks(actor, skill), skill.ranks)
    }));
};