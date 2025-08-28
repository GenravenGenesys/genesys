export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function apiRequest<T>(url: string, method: HttpMethod = "GET", body?: Record<string, unknown>
): Promise<T> {
    const options: RequestInit = {
        method,
        headers: {"Content-Type": "application/json"},
        body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch("/api" + url, options);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export async function apiRequestList<T, B extends object>(
    url: string,
    method: HttpMethod = "GET",
    body?: B[]
): Promise<T[]> {

    const options: RequestInit = {
        method,
        headers: {"Content-Type": "application/json"},
        body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch("/api" + url, options);

    if (response.status === 204) {
        return [];
    }

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}