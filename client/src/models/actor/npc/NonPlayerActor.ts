import Actor, {ActorSkill} from "../Actor";
import Ability from "../../Ability";
import { ActorTalent } from "../../Talent";
import Injury from "../../Injury";

export enum RatingType {
    Combat = 'Combat',
    Social = 'Social',
    General = 'General'
}

export default interface NonPlayerActor extends Actor {
    combat: number,
    social: number,
    general: number,
    abilities: Ability[],
    talents: ActorTalent[]
}

export interface SingleNonPlayerCharacter extends NonPlayerActor {
    skills: ActorSkill[]
    injuries: Injury[]
}

export const getRatings = (npc: NonPlayerActor): string => {
    return '[combat] ' + String(npc?.combat!) + ' [social] ' + String(npc?.social!) + ' [general] ' + String(npc?.general!)
}

export const combat = '[combat]'
export const social = '[social]'
export const general = '[general]'