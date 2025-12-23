import Campaign from "../models/campaign/Campaign";
import {CampaignPath} from "./RootPath";
import Scene from "../models/campaign/Scene";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class CampaignService {
    static async createCampaign(campaign: Campaign): Promise<Campaign> {
        return apiRequest(CampaignPath.Campaign, "POST", campaign);
    };

    static async getAllCampaigns(): Promise<Campaign[]> {
        return apiRequestList(CampaignPath.Campaign);
    };

    static async getCampaign(id: string): Promise<Campaign> {
        return apiRequest(CampaignPath.Campaign + `${id}`);
    };

    static async updateCampaign(campaign: Campaign): Promise<Campaign> {
        return apiRequest(CampaignPath.Campaign + `${campaign.id}`, "PUT", campaign);
    };

    static async getCampaignScenes(): Promise<Scene[]> {
        return apiRequestList(CampaignPath.Scene);
    };

    static async addCampaignScene(scene: Scene): Promise<Campaign> {
        return apiRequest(CampaignPath.Scene, "POST", scene);
    };

    static async getCurrentCampaign(): Promise<Campaign> {
        return apiRequest(CampaignPath.Current);
    };

    static async setCurrentCampaign(campaign_id: string): Promise<Campaign> {
        return apiRequest(CampaignPath.Current + `${campaign_id}`, "PUT");
    };
}