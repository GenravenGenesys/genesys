import Player, {PlayerSkill} from "../../models/actor/player/Player";
import {PlayerPath, CampaignPath, RootPath} from "../RootPath";
import Career from "../../models/actor/player/Career";
import Archetype from "../../models/actor/player/Archetype";
import {Characteristic, CharacteristicType} from "../../models/actor/Characteristic";
import Talent from "../../models/Talent";
import { apiRequest, apiRequestList } from "../ApiRequest";

export default class PlayerService {
    static async createPlayer(id: string, playerName: string): Promise<Player> {
        return apiRequest(CampaignPath.Campaign + `${id}` + PlayerPath.Player + `${playerName}`, "POST");
    };

    static async getPlayer(id: string): Promise<Player> {
        return apiRequest(PlayerPath.Player + `${id}`);
    };

    static async getPlayers(campaignName: string): Promise<Player[]> {
        return apiRequestList(CampaignPath.Campaign + `${campaignName}` + PlayerPath.Player);
    };

    static async updatePlayer(player: Player): Promise<Player> {
        return apiRequest(PlayerPath.Player + `${player.id}`, "PUT", player);
    };

    static async updatePlayerCareer(playerId: string, career: Career): Promise<Player> {
        return apiRequest(PlayerPath.Creation + `${playerId}` + RootPath.Career, "PATCH", career);
    };

    static async updatePlayerCareerSkills(playerId: string, skills: PlayerSkill[]): Promise<Player> {
        return apiRequest(PlayerPath.Creation + `${playerId}` + RootPath.Career + 'skills/', "PATCH", skills);
    };

    static async updatePlayerArchetype(playerId: string, archetype: Archetype): Promise<Player> {
        return apiRequest(PlayerPath.Creation + `${playerId}` + RootPath.Archetype, "PATCH", archetype);
    };

    static async purchaseCharacteristicUpgrade(playerId: string, characteristic: CharacteristicType): Promise<Player> {
        return apiRequest(PlayerPath.Creation + `${playerId}` + PlayerPath.Characteristic + characteristic, "PATCH");
    };

    static async purchaseSkillUpgrade(playerId: string, skill: PlayerSkill): Promise<Player> {
        return apiRequest(PlayerPath.Creation + `${playerId}` + PlayerPath.Skills, "PATCH", skill);
    };

    static async purchaseTalentUpgrade(playerId: string, talent: Talent): Promise<Player> {
        return apiRequest(PlayerPath.Creation + `${playerId}` + PlayerPath.Talents, "PATCH", talent);
    };
}