import {useEffect, useState} from "react";
import type {Campaign} from "../../api/model";
import {
    getCurrentCampaignController
} from "../../api/generated/current-campaign-controller/current-campaign-controller.ts";

export const useFetchCurrentCampaign = () => {
    const [campaign, setCampaign] = useState<Campaign>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getCurrentCampaignController().getCurrentCampaign();
                setCampaign(response);
            } catch (err) {
                setError('Failed to load current campaign.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { campaign, loading, error };
}