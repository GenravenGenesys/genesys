import type {ActorSkill} from "../../models/actor/Actor";
import type Rival from "../../models/actor/npc/Rival";
import {apiRequest, apiRequestList} from "../ApiRequest";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";

export default class RivalService {
    static async getRival(id: string): Promise<Rival> {
        return apiRequest(ActorPath.Rival + `${id}`);
    };

    static async createRival(id: string, rivalName: string): Promise<Rival> {
        return apiRequest(CampaignPath.Campaign + `${id}` + ActorPath.Rival + `${rivalName}`, "POST");
    };

    static async getRivals(campaignName: string): Promise<Rival[]> {
        return apiRequestList(CampaignPath.Campaign + `${campaignName}` + ActorPath.Rival);
    };

    static async updateRival(rival: Rival): Promise<Rival> {
        return apiRequest(ActorPath.Rival + `${rival.id}`, "PUT", rival);
    };

    static async updateRivalSkill(id: string, skill: ActorSkill): Promise<Rival> {
        return apiRequest(ActorPath.Rival + `${id}` + RootPath.Skills, "PATCH", skill);
    };
}