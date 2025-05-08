export async function apiRequest<T>(url: string, method: string = "GET", body?: any): Promise<T> {
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

export async function apiRequestList<T>(url: string, method: string = "GET", body?: any): Promise<T[]> {
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