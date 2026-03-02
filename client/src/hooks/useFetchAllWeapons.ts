import {useEffect, useState} from "react";
import type {Weapon} from "../api/model";
import {getWeaponController} from "../api/generated/weapon-controller/weapon-controller.ts";

export const useFetchAllWeapons = () => {
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getWeaponController().getAllWeapons();
                setWeapons(response);
            } catch (err) {
                setError('Failed to load careers. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { weapons, loading, error };
}