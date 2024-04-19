import Character from "../Character";
import {GroupSkill, GroupTalent} from "../../actor/npc/Minion";
import Ability from "../../Ability";

export interface MinionCharacter extends Character {
    talents: MinionTalent[]
    skills: MinionSkill[]
    abilities: Ability[]
    group: number
}

export interface MinionTalent extends GroupTalent {
}

export interface MinionSkill extends GroupSkill {
}