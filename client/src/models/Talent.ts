import {Option} from "../components/common/InputSelectField";
import Modifier from "./common/Modifier";
import Cost from "./common/Cost";
import Limit from "./common/Limit";
import Skill from "./actor/Skill";

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
    modifiers: Modifier[]
}

export interface TalentSkills {
    potentialCareerSkills: Skill[]
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