import {useEffect, useState} from "react";
import type {Player} from "../api/model";
import {getPlayerController} from "../api/generated/player-controller/player-controller.ts";


export const useFetchAllPlayers = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getPlayerController().getAllPlayers();
                setPlayers(response);
            } catch (err) {
                setError('Failed to load players. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { players, loading, error };
}