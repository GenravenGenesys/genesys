import { ActorType } from "../../models/actor/Actor";
import {type MinionGroup } from "../../models/actor/npc/Minion";
import type Nemesis from "../../models/actor/npc/Nemesis";
import { type SingleNonPlayerCharacter } from "../../models/actor/npc/NonPlayerActor";
import type Rival from "../../models/actor/npc/Rival";
import type Player from "../../models/actor/player/Player";
import type Character from "../../models/campaign/encounter/Character";
import { apiRequestList } from "../ApiRequest";
import { EncounterPath } from "../RootPath";

export default class CharacterService {

    static async convertPlayersToCharacters(players: Player[]): Promise<Character[]> {
        return apiRequestList(EncounterPath.ConvertPlayers, "GET", players);
    };

    static async convertNonPlayerCharacters(npcs: SingleNonPlayerCharacter[]): Promise<Character[]> {
        const nemeses = npcs.filter((n): n is Nemesis => n.type === ActorType.Nemesis);
        const rivals = npcs.filter((r): r is Rival => r.type === ActorType.Rival);
        const minions = npcs.filter((m): m is MinionGroup => m.type === ActorType.Minion);

        const [convertedNemeses, convertedRivals, convertedMinions] = await Promise.all([
            this.convertNemesesToCharacters(nemeses),
            this.convertRivalsToCharacters(rivals),
            this.convertMinionGroupsToCharacters(minions),
        ]);

        return [...convertedNemeses, ...convertedRivals, ...convertedMinions];
    }

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

// export const convertNonPlayerCharacters = (npcs: SingleNonPlayerCharacter[]): Character[] => {
//     return [] as Character[];
// }