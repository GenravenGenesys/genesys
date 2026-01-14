import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {useGetCampaign} from "../../api/generated/campaign-controller/campaign-controller.ts";

export function useCampaignLive(campaignId: string) {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useGetCampaign(campaignId);

    useEffect(() => {
        const eventSource = new EventSource(`/api/campaigns/${campaignId}/stream`);

        eventSource.onmessage = (event) => {
            const updatedCampaign = JSON.parse(event.data);
            queryClient.setQueryData(['campaigns', campaignId], updatedCampaign);
        };

        return () => eventSource.close();
    }, [campaignId, queryClient]);

    const campaign = data?.data;

    return { campaign, isLoading, error: Error };
}