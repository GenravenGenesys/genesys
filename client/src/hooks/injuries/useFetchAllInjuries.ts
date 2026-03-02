import {useEffect, useState} from "react";
import {getInjuryController} from "../../api/generated/injury-controller/injury-controller.ts";
import type {CriticalInjury} from "../../api/model";

export const useFetchAllInjuries = () => {
    const [injuries, setInjuries] = useState<CriticalInjury[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getInjuryController().getAllInjuries();
                setInjuries(response);
            } catch (err) {
                setError('Failed to load injuries. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { injuries, loading, error };
}