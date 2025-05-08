import Lore from "../../models/lore/Lore";
import {CampaignPath} from "../RootPath";
import {apiRequestList} from "../ApiRequest";


export default class LoreService {
    static async getAllLore(campaignId: string): Promise<Lore[]> {
        return apiRequestList(CampaignPath.Campaign + `${campaignId}` + CampaignPath.Lore);
    }
}