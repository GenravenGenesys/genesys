import {useEffect, useState} from "react";
import type {Archetype} from "../api/model";
import {getArchetypeController} from "../api/generated/archetype-controller/archetype-controller.ts";

export const useFetchAllArchetypes = () => {
    const [archetypes, setArchetypes] = useState<Archetype[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getArchetypeController().getAllArchetypes();
                setArchetypes(response);
            } catch (err) {
                setError('Failed to load archetypes. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { archetypes, loading, error };
}