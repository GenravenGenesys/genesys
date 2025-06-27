import Campaign from "../models/campaign/Campaign";
import {CampaignPath} from "./RootPath";
import Talent, {Tier} from "../models/Talent";
import Skill from "../models/actor/Skill";
import Scene from "../models/campaign/Scene";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class CampaignService {
    static async createCampaign(campaign: Campaign): Promise<Campaign> {
        return apiRequest(CampaignPath.Campaign, "POST", campaign);
    };

    static async getAllCampaigns(): Promise<Campaign[]> {
        return apiRequestList(CampaignPath.Campaign);
    };

    static async getCampaign(name: string): Promise<Campaign> {
        return apiRequest(CampaignPath.Campaign + `${name}`);
    };

    static async updateCampaign(campaign: Campaign): Promise<Campaign> {
        return apiRequest(CampaignPath.Campaign + `${campaign.id}`, "PUT", campaign);
    };

    static async getCampaignTalents(): Promise<Talent[]> {
        return apiRequestList(CampaignPath.Talents);
    };

    static async addCampaignTalent(talent: Talent): Promise<Campaign> {
        return apiRequest(CampaignPath.Talents, "POST", talent);
    };

    static async getCampaignTierTalents(tier: Tier): Promise<Talent[]> {
        return apiRequestList(CampaignPath.TalentTiers + `${tier}`);
    };

    static async getCampaignSkills(): Promise<Skill[]> {
        return apiRequestList(CampaignPath.Skills);
    };

    static async addCampaignSkill(skill: Skill): Promise<Campaign> {
        return apiRequest(CampaignPath.Skills, "POST", skill);
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