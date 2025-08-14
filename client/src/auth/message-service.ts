import {ApiResponse} from "./Models";
import {callExternalApi} from "./external-api";


const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getPublicResource = async (): Promise<ApiResponse> => {
    const config = {
        url: `${apiServerUrl}/api/messages/public`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });
    return { data, error };
};

export const getProtectedResource = async (
    accessToken: string
): Promise<ApiResponse> => {
    const config = {
        url: `${apiServerUrl}/api/messages/protected`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    return { data, error };
};

export const getAdminResource = async (
    accessToken: string
): Promise<ApiResponse> => {
    const config = {
        url: `${apiServerUrl}/api/messages/admin`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    return { data, error };
};