import { ActorTalent } from "../../Talent";
import Actor, {ActorSkill} from "../Actor";
import Injury from "../../Injury";
import Career from "./Career";
import Archetype from "./Archetype";

export default interface Player extends Actor {
    strain: number
    encumbrance: number
    experience: Experience
    career: Career
    archetype: Archetype
    talents: ActorTalent[]
    skills: PlayerSkill[]
    injuries: Injury[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}

export interface Experience {
    initial: number
    total: number
    available: number
}