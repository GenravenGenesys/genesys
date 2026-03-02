
import Character from "./Character";
import Action from "./Action";
import Maneuver from "./Maneuver";
import Incidental from "./Incidental";
import type {GenesysSymbolResults} from "../../../api/model";

export default interface InitiativeSlot {
    type: Type
    results: GenesysSymbolResults
    character: Character
    action: Action
    maneuvers: Maneuver[]
    incidentals: Incidental[]
}

export enum Type {
    Party = 'Party',
    NPC = 'NPC'
}