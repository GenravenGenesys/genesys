import { MinionGroup } from "../../models/actor/npc/Minion";
import Nemesis from "../../models/actor/npc/Nemesis";
import Rival from "../../models/actor/npc/Rival";
import Player from "../../models/actor/player/Player";
import Character from "../../models/campaign/encounter/Character";
import { apiRequestList } from "../ApiRequest";
import { EncounterPath } from "../RootPath";

export default class CharacterService {

    static async convertPlayersToCharacters(players: Player[]): Promise<Character[]> {
        return apiRequestList(EncounterPath.ConvertPlayers, "GET", players);
    };

    static async convertNemesesToCharacters(nemeses: Nemesis[]): Promise<Character[]> {
        return apiRequestList(EncounterPath.ConvertNemeses, "GET", nemeses);
    };

    static async convertRivalsToCharacters(rivals: Rival[]): Promise<Character[]> {
        return apiRequestList(EncounterPath.ConvertRivals, "GET", rivals);
    };

    static async convertMinionGroupsToCharacters(minions: MinionGroup[]): Promise<Character[]> {
        return apiRequestList(EncounterPath.ConvertMinionGroups, "GET", minions);
    };
}