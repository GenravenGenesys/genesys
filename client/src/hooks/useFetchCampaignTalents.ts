import {useEffect, useState} from "react";
import type {Talent, Tier} from "../api/model";
import {getCampaignTalentController} from "../api/generated/campaign-talent-controller/campaign-talent-controller.ts";

export const useFetchCampaignTalents = (type?: Tier) => {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getCampaignTalentController().getTalentsForCurrentCampaign();
                if (type) {
                    const filtered = response.filter(talent => talent.tier === type);
                    setTalents(filtered);
                    return;
                }
                setTalents(response);
            } catch (err) {
                setError('Failed to load talents. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { talents, loading, error };
}