import Campaign from "../models/campaign/Campaign";
import {CampaignPath} from "./RootPath";
import Talent, {Tier} from "../models/Talent";
import Skill from "../models/actor/Skill";
import Scene from "../models/campaign/Scene";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class CampaignService {
    static async createCampaign(campaign: Campaign): Promise<Campaign> {
        return apiRequest<Campaign>(CampaignPath.Campaign, "POST", campaign);
    }

    static async getAllCampaigns(): Promise<Campaign[]> {
        return apiRequestList<Campaign>(CampaignPath.Campaign);
    }

    static async getCampaign(name: string): Promise<Campaign> {
        return apiRequest<Campaign>(CampaignPath.Campaign + `${name}`);
    }

    static async updateCampaign(campaign: Campaign): Promise<Campaign> {
        return apiRequest<Campaign>(CampaignPath.Campaign + `${campaign.id}`, "PUT", campaign);
    }

    static async getCampaignTalents(): Promise<Talent[]> {
        return apiRequestList<Talent>(CampaignPath.Talents);
    }

    static async addCampaignTalent(talent: Talent): Promise<Campaign> {
        return apiRequest<Campaign>(CampaignPath.Talents, "POST", talent);
    }

    static async getCampaignTierTalents(tier: Tier): Promise<Talent[]> {
        return apiRequestList<Talent>(CampaignPath.TalentTiers + `${tier}`);
    }

    static async getCampaignSkills(): Promise<Skill[]> {
        return apiRequestList<Skill>(CampaignPath.Skills);
    }

    static async addCampaignSkill(skill: Skill): Promise<Campaign> {
        return apiRequest<Campaign>(CampaignPath.Skills, "POST", skill);
    }

    static async getCampaignScenes(): Promise<Scene[]> {
        return apiRequestList<Scene>(CampaignPath.Scene);
    }

    static async addCampaignScene(scene: Scene): Promise<Campaign> {
        return apiRequest<Campaign>(CampaignPath.Scene, "POST", scene);
    }

    static async getCurrentCampaign(): Promise<Campaign> {
        return apiRequest(CampaignPath.Current);
    };

    static async setCurrentCampaign(campaign_id: string): Promise<Campaign> {
        return apiRequest(CampaignPath.Current + `${campaign_id}`, "PUT");
    };
}