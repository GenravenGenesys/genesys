import { SingleNonPlayerCharacter } from "../actor/npc/NonPlayerActor";
import Nemesis from "../actor/npc/Nemesis";
import type {Player} from "../../api/model";

export default interface Party {
    players: Player[]
    nemesis: Nemesis[]
    npcs: SingleNonPlayerCharacter[]
}