import {useEffect, useState} from "react";
import {getOrganizationController} from "../api/generated/organization-controller/organization-controller.ts";
import type {Organization} from "../api/model";


export const useFetchAllOrganizations = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getOrganizationController().getAllOrganizations();
                setOrganizations(response);
            } catch (err) {
                setError('Failed to load archetypes. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { organizations, loading, error };
}