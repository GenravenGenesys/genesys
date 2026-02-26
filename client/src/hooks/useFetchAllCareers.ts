import {useEffect, useState} from "react";
import type {Career} from "../api/model";
import {getCareerController} from "../api/generated/career-controller/career-controller.ts";

export const useFetchAllCareers = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getCareerController().getAllCareers();
                setCareers(response);
            } catch (err) {
                setError('Failed to load careers. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { careers, loading, error };
}