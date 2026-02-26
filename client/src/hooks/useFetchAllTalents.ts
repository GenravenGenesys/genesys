import {useEffect, useState} from "react";
import type {Talent} from "../api/model";
import {getTalentController} from "../api/generated/talent-controller/talent-controller.ts";

export const useFetchAllTalents = () => {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getTalentController().getAllTalents();
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