import {useEffect, useState} from "react";
import type {Lore} from "../api/model";
import {getLoreController} from "../api/generated/lore-controller/lore-controller.ts";

export const useFetchAllLore = () => {
    const [lore, setLore] = useState<Lore[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getLoreController().getAllLore();
                setLore(response);
            } catch (err) {
                setError('Failed to load qualities. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { lore, loading, error };
}