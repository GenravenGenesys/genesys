import CampaignSession from "./CampaignSession";
import Party from "./Party";
import Talent from "../Talent";


export default interface Campaign {
    campaign_id: number
    name: string;
    party: Party
    sessions: CampaignSession[]
    talents: Talent[]
}