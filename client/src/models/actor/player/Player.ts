import type {
    ActorTalent,
    Archetype,
    Career,
    CriticalInjury,
    Stats,
    PlayerSkill,
    Experience
} from "../../../api/model";
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