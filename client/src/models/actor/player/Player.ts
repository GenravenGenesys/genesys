import type {ActorSkill, ActorTalent, Archetype, Career, CriticalInjury, Stats} from "../../../api/model";
import type Actor from "../Actor.ts";


export default interface Player extends Actor {
    strain: Stats
    encumbrance: number
    experience: Experience
    career: Career
    archetype: Archetype
    talents: ActorTalent[]
    skills: PlayerSkill[]
    injuries: CriticalInjury[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}

export interface Experience {
    initial: number
    total: number
    available: number
}