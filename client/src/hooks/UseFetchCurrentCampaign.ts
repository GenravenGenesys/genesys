import CampaignService from "../services/CampaignService";
import Campaign from "../models/campaign/Campaign";
import {useQuery} from "@tanstack/react-query";

export function useFetchCurrentCampaign() {
    return useQuery<Campaign>({
        queryKey: ['currentCampaign'],
        queryFn: CampaignService.getCurrentCampaign,
    });
}