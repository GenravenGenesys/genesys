import {useEffect, useState} from "react";
import type {Campaign} from "../../api/model";
import {getCampaignController} from "../../api/generated/campaign-controller/campaign-controller.ts";

export const useFetchAllCampaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getCampaignController().getAllCampaigns();
                setCampaigns(response);
            } catch (err) {
                setError('Failed to load campaigns. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { campaigns, loading, error };
}