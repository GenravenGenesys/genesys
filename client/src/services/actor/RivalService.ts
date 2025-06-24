import Rival from "../../models/actor/npc/Rival";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";
import {ActorSkill} from "../../models/actor/Actor";
import {apiRequest, apiRequestList} from "../ApiRequest";

export default class RivalService {
    static async getRival(id: string): Promise<Rival> {
        return apiRequest<Rival>(ActorPath.Rival + `${id}`);
    }

    static async createRival(id: string, rivalName: string): Promise<Rival> {
        return apiRequest<Rival>(CampaignPath.Campaign + `${id}` + ActorPath.Rival + `${rivalName}`, "POST");
    }

    static async getRivals(campaignName: string): Promise<Rival[]> {
        return apiRequestList<Rival>(CampaignPath.Campaign + `${campaignName}` + ActorPath.Rival);
    }

    static async updateRival(rival: Rival): Promise<Rival> {
        return apiRequest<Rival>(ActorPath.Rival + `${rival.id}`, "PUT", rival);
    }

    static async updateRivalSkill(id: string, skill: ActorSkill): Promise<Rival> {
        return apiRequest<Rival>(ActorPath.Rival + `${id}` + RootPath.Skills, "PATCH", skill);
    }
}