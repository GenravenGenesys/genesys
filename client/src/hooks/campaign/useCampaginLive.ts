import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {useGetCampaign} from "../../api/generated/campaign-controller/campaign-controller.ts";

export function useCampaignLive(campaignId: string) {
    const queryClient = useQueryClient();

    // 1. Fetch initial data using Orval-generated hook
    const { data, isLoading, error } = useGetCampaign(campaignId);

    useEffect(() => {
        // 2. Open the real-time stream
        const eventSource = new EventSource(`/api/campaigns/${campaignId}/stream`);

        eventSource.onmessage = (event) => {
            const updatedCampaign = JSON.parse(event.data);

            // 3. MANUALLY UPDATE THE CACHE
            // This tells React Query: "I have new data, don't go back to the server"
            queryClient.setQueryData(['campaigns', campaignId], updatedCampaign);
        };

        return () => eventSource.close();
    }, [campaignId, queryClient]);

    return { data, isLoading, error };
}