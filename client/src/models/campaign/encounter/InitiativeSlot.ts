import {GenesysSymbols} from "../../roll/GenesysSymbols";
import Character from "./Character";
import Action from "./Action";
import Maneuver from "./Maneuver";
import Incidental from "./Incidental";

export default interface InitiativeSlot {
    type: Type
    results: Record<GenesysSymbols, number>
    character: Character
    action: Action
    maneuvers: Maneuver[]
    incidentals: Incidental[]
}

export enum Type {
    Party = 'Party',
    NPC = 'NPC'
}