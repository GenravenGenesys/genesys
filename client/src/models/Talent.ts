import {Option} from "../components/common/InputSelectField";
import Modifier from "./common/Modifier";
import Cost from "./common/Cost";
import Limit from "./common/Limit";
import Skill from "./actor/Skill";
import {ActorSkill} from "./actor/Actor";
import {Difficulty} from "./common/Difficulty";
import Action from "./campaign/encounter/Action";

export default interface Talent {
    id: string
    name: string
    ranked: boolean
    activation: Activation
    tier: Tier
    summary: string
    description: string
    cost: Cost
    limit: Limit
    talentSkills: TalentSkills
    talentStats: TalentStats
    talentSkillCheck: TalentSkillCheck
    action: Action
    talentRollModifiers: TalentRollModifiers[]
    modifiers: Modifier[]
}

export interface TalentSkills {
    potentialCareerSkills: Skill[]
}

export interface TalentStats {
    wounds: number
    strain: number
    soak: number
    defense: number
}

export interface TalentSkillCheck {
    skill: ActorSkill
    difficulty: Difficulty
    opposedSkill: ActorSkill
}

export interface TalentRollModifiers {
    skill: ActorSkill
}

export enum Activation {
    Passive = 'Passive',
    ActiveAction = 'Active (Action)',
    ActiveManeuver = 'Active (Maneuver)',
    ActiveIncidental = 'Active (Incidental)',
    ActiveIncidentalOutOfTurn = 'Active (Incidental, Out of Turn)'
}

export const getActivationOptions = (): Option[] => {
    return Object.values(Activation).map((value) => ({value}))
}

export enum Tier {
    First = 'First',
    Second = 'Second',
    Third = 'Third',
    Fourth = 'Fourth',
    Fifth = 'Fifth'
}

export interface ActorTalent extends Talent {
    ranks: number
}