import type Player from "../../models/actor/player/Player";
import type { PlayerSkill } from "../../models/actor/player/Player";
import {PlayerPath, CampaignPath, RootPath} from "../RootPath";
import { apiRequest, apiRequestList } from "../ApiRequest";
import type {Career, Characteristic, Talent, Archetype} from "../../api/model";

export default class PlayerService {
    static async getPlayer(id: string): Promise<Player> {
        return apiRequest(PlayerPath.Player + `${id}`);
    };

    static async updatePlayer(player: Player): Promise<Player> {
        return apiRequest(PlayerPath.Player + `${player.id}`, "PUT", player);
    };
}