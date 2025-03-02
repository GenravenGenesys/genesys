import Party from "../Party";
import {MinionGroup} from "../../actor/npc/Minion";
import Rival from "../../actor/npc/Rival";
import Nemesis from "../../actor/npc/Nemesis";
import InitiativeSlot from "./InitiativeSlot";

export default interface Encounter {
    type: Type
    party: Party
    enemyMinionGroups: MinionGroup[]
    enemyRivals: Rival[]
    enemyNemeses: Nemesis[]
    slots: InitiativeSlot[]
}

export enum Type {
    Combat = 'Combat',
    Social = 'Social',
}