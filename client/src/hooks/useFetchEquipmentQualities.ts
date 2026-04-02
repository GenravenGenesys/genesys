import {useEffect, useState} from "react";
import type {EquipmentQuality} from "../api/model";
import {getQualityController} from "../api/generated/quality-controller/quality-controller.ts";

export const useFetchEquipmentQualities = () => {
    const [equipmentQualities, setEquipmentQualities] = useState<EquipmentQuality[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const qualities = await getQualityController().getAllQualities();
                const updatedQualities = qualities.filter((quality) => quality.weapon).map((quality) => ({
                    ...quality,
                    ranks: 1,
                } as EquipmentQuality));
                setEquipmentQualities(updatedQualities);
            } catch (err) {
                setError('Failed to load qualities. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {equipmentQualities, loading, error};
}