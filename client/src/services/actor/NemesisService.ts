import Nemesis from "../../models/actor/npc/Nemesis";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";
import {ActorSkill} from "../../models/actor/Actor";
import { apiRequest, apiRequestList } from "../ApiRequest";

export default class NemesisService {
    static async createNemesis(id: string, nemesisName: string): Promise<Nemesis> {
        return apiRequest(CampaignPath.Campaign + `${id}` + ActorPath.Nemesis + `${nemesisName}`, "POST");
    }

    static async getNemesis(id: string): Promise<Nemesis> {
        return apiRequest(ActorPath.Nemesis + `${id}`);
    };

    static async getNemeses(campaignName: string): Promise<Nemesis[]> {
        return apiRequestList(CampaignPath.Campaign + `${campaignName}` + ActorPath.Nemesis);
    };

    static async updateNemesis(nemesis: Nemesis): Promise<Nemesis> {
        return apiRequest(ActorPath.Nemesis + `${nemesis.id}`, "PUT", nemesis);
    };

    static async updateNemesisSkill(id: string, skill: ActorSkill): Promise<Nemesis> {
        return apiRequest(ActorPath.Nemesis + `${id}` + RootPath.Skills, "PUT", skill);
    };
}