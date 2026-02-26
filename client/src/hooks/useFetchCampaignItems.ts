import {useEffect, useState} from "react";
import type {ItemTemplate} from "../api/model";
import {getItemCompendium} from "../api/generated/item-compendium/item-compendium.ts";

export const useFetchCampaignItems = (campaignId: string) => {
    const [items, setItems] = useState<ItemTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getItemCompendium().getItems(campaignId);
                setItems(response);
            } catch (err) {
                setError('Failed to load campaign items. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        if (campaignId) {
            fetchData();
        }
    }, [campaignId]);

    return { items, loading, error };
}
