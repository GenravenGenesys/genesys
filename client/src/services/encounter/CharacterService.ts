import Player from "../../models/actor/player/Player";
import Character from "../../models/campaign/encounter/Character";
import { apiRequestList } from "../ApiRequest";
import { EncounterPath } from "../RootPath";

export default class CharacterService {

    static async convertPlayersToCharacters(players: Player[]): Promise<Character[]> {
        return apiRequestList(EncounterPath.ConvertPlayers, "GET", players);
    }
}