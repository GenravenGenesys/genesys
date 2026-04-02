import {useEffect, useState} from "react";
import type {ModifierType} from "../api/model";
import {getModifierController} from "../api/generated/modifier-controller/modifier-controller.ts";

export const useFetchAllModifierTypes = () => {
    const [modifiers, setModifiers] = useState<ModifierType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getModifierController().getModifiers();
                setModifiers(response);
            } catch (err) {
                setError('Failed to load qualities. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {modifiers, loading, error};
}