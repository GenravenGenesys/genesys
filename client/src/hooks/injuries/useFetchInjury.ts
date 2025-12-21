import {useEffect, useState} from "react";
import type {CriticalInjury} from "../../api/model";
import {getInjuryController} from "../../api/generated/injury-controller/injury-controller.ts";

export const useFetchInjury = (id: string) => {
    const [injury, setInjury] = useState<CriticalInjury>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getInjuryController().getInjuryByName(id);
                setInjury(response);
            } catch (err) {
                setError('Failed to load injuries. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { injury, loading, error };
}