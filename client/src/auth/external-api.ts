import {ApiResponse, AppError} from "./Models";


export const callExternalApi = async (options: {
    config: RequestInit & { url: string };
}): Promise<ApiResponse> => {
    try {
        const response = await fetch(options.config.url, options.config);

        const contentType = response.headers.get("content-type");
        const isJson = contentType?.includes("application/json");

        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            const errorMessage =
                (data as AppError)?.message ||
                response.statusText ||
                "HTTP request failed";

            return {
                data: null,
                error: { message: errorMessage },
            };
        }

        return {
            data,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: {
                message: (error as Error).message || "Unexpected error occurred",
            },
        };
    }
};