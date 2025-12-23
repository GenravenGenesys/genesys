import type Equipment from "./Equipment";
import type {RangeBand, Skill} from "../../api/model";

export interface Gear extends Equipment {
    skill: Skill
    amount: number
    range: RangeBand
}

export interface ActorGear extends Gear {}