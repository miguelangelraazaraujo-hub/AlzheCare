
const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

 export async function request(endpoint, options = {}) {
    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...(options.body ? { "Content-Type": "application/json" } : {}),
                ...options.headers,
            },
        });
    } catch {
        throw new Error(
            "No se pudo conectar con el servidor. Comprueba que el backend esté iniciado."
        );
    }

    const responseText = await response.text();
    let data = null;

    if (responseText) {
        try {
            data = JSON.parse(responseText);
        } catch {
            data = null;
        }
    }

    if (!response.ok) {
        const message =
            data?.detail ||
            data?.message ||
            data?.error ||
            `Error en la petición (${response.status}).`;

        throw new Error(message);
    }

    return data;
}

const authService = {
    register(userData) {
        return request("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    login(credentials) {
        return request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    },

    getCurrentUser(token) {
        return request("/api/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default authService;
