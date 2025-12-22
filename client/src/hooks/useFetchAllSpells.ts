import {useEffect, useState} from "react";
import type {Spell} from "../api/model";
import {getSpellController} from "../api/generated/spell-controller/spell-controller.ts";

export const useFetchAllSpells = () => {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getSpellController().getAllSpells();
                setSpells(response);
            } catch (err) {
                setError('Failed to load spells. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { spells, loading, error };
}