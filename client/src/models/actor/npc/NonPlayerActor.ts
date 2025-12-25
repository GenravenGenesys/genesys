import type Actor from "../Actor";
import { type ActorSkill } from "../Actor";
import type {ActorTalent, CriticalInjury, Ability} from "../../../api/model";

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
    injuries: CriticalInjury[]
}

export const getRatings = (npc: NonPlayerActor): string => {
    if (npc) {
        return combat + String(npc.combat) + social + String(npc.social) + general + String(npc.general);
    }
    return combat + 1 + social + 1 + general + 1;
}

export const combat = '[combat] ';
export const social = ' [social] ';
export const general = ' [general] ';