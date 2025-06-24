import Minion, {GroupSkill} from "../../models/actor/npc/Minion";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";
import {apiRequest, apiRequestList} from "../ApiRequest";

export default class MinionService {
    static async createMinion(id: string, minionName: string): Promise<Minion> {
        return apiRequest<Minion>(CampaignPath.Campaign + `${id}` + ActorPath.Minion + `${minionName}`, "POST");
    }

    static async getMinion(id: string): Promise<Minion> {
        return apiRequest<Minion>(ActorPath.Minion + `${id}`);
    }

    static async getMinions(campaignName: string): Promise<Minion[]> {
        return apiRequestList<Minion>(CampaignPath.Campaign + `${campaignName}` + ActorPath.Minion);
    }

    static async updateMinion(minion: Minion): Promise<Minion> {
        return apiRequest<Minion>(ActorPath.Minion + `${minion.id}`, "PUT", minion);
    }

    static async updateMinionSkill(id: string, skill: GroupSkill): Promise<Minion> {
        return apiRequest<Minion>(ActorPath.Minion + `${id}` + RootPath.Skills, "PATCH", skill);
    }
}