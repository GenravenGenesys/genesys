import Minion, {GroupSkill} from "../../models/actor/npc/Minion";
import { apiRequest, apiRequestList } from "../ApiRequest";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";

export default class MinionService {
    static async createMinion(id: string, minionName: string): Promise<Minion> {
        return apiRequest(CampaignPath.Campaign + `${id}` + ActorPath.Minion + `${minionName}`, "POST");
    };

    static async getMinion(id: string): Promise<Minion> {
        return apiRequest(ActorPath.Minion + `${id}`);
    };

    static async getMinions(campaignName: string): Promise<Minion[]> {
        return apiRequestList(CampaignPath.Campaign + `${campaignName}` + ActorPath.Minion);
    };

    static async updateMinion(minion: Minion): Promise<Minion> {
        return apiRequest(ActorPath.Minion + `${minion.id}`, "PUT", minion);
    };

    static async updateMinionSkill(id: string, skill: GroupSkill): Promise<Minion> {
        return apiRequest(ActorPath.Minion + `${id}` + RootPath.Skills, "PATCH", skill);
    };
}