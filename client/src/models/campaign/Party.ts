import Player from "../actor/player/Player";
import { SingleNonPlayerCharacter } from "../actor/npc/NonPlayerActor";
import Nemesis from "../actor/npc/Nemesis";

export default interface Party {
    players: Player[]
    nemesis: Nemesis[]
    npcs: SingleNonPlayerCharacter[]
}