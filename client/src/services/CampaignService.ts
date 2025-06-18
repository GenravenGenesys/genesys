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
        return await fetch(CampaignPath.Talents)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addCampaignTalent(talent: Talent): Promise<Campaign> {
        return await fetch(CampaignPath.Talents, {
            method: "POST",
            body: JSON.stringify(talent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCampaignTierTalents(tier: Tier): Promise<Talent[]> {
        return await fetch(CampaignPath.TalentTiers + `${tier}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCampaignSkills(): Promise<Skill[]> {
        return await fetch(CampaignPath.Skills)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addCampaignSkill(skill: Skill): Promise<Campaign> {
        return await fetch(CampaignPath.Skills, {
            method: "POST",
            body: JSON.stringify(skill),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCampaignScenes(): Promise<Scene[]> {
        return await fetch(CampaignPath.Scene)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addCampaignScene(scene: Scene): Promise<Campaign> {
        return await fetch(CampaignPath.Scene, {
            method: "POST",
            body: JSON.stringify(scene),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCurrentCampaign(): Promise<Campaign> {
        return apiRequest(CampaignPath.Current);
    };

    static async setCurrentCampaign(campaign_id: string): Promise<Campaign> {
        return apiRequest(CampaignPath.Current + `${campaign_id}`, "PUT");
    };
}