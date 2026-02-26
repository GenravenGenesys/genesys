import {useEffect, useState} from "react";
import type {Quality} from "../api/model";
import {getQualityController} from "../api/generated/quality-controller/quality-controller.ts";

export const useFetchAllQualities = () => {
    const [qualities, setQualities] = useState<Quality[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getQualityController().getAllQualities();
                setQualities(response);
            } catch (err) {
                setError('Failed to load qualities. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { qualities, loading, error };
}