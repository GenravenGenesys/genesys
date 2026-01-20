export const customFetch = async <T>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    const response = await fetch(`http://localhost:8080${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
        data,
        status: response.status,
        headers: response.headers,
    } as T;
};
