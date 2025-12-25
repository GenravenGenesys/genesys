import {useEffect, useState} from "react";
import type {Armor} from "../api/model";
import {getArmorController} from "../api/generated/armor-controller/armor-controller.ts";

export const useFetchAllArmor = () => {
    const [armors, setArmors] = useState<Armor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getArmorController().getAllArmors();
                setArmors(response);
            } catch (err) {
                setError('Failed to load careers. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { armors, loading, error };
}