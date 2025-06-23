const API_URL = "http://localhost:8000/api";

export async function apiFetch(path, options) {
    const res = await fetch(`${API_URL}${path}`, {
        method: options.method || "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data
}