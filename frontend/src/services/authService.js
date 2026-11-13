
const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

function getErrorMessage(status, data, endpoint) {
    if (status === 401) {
        if (endpoint.includes("/login")) {
            return "El correo electrónico o la contraseña no son correctos.";
        }

        return "Tu sesión ha caducado. Inicia sesión de nuevo.";
    }

    if (status === 403) {
        return "No tienes permisos para realizar esta operación.";
    }

    if (status === 404) {
        return "No se ha encontrado la información solicitada.";
    }

    if (status === 409) {
        return "La operación no se ha podido completar porque existe información duplicada.";
    }

    if (status >= 500) {
        return "El servidor no está disponible en este momento. Inténtelo de nuevo más tarde.";
    }

    if (status === 400 || status === 422) {
        const backendMessage =
            data?.detail || data?.message || data?.error;

        return typeof backendMessage === "string" && backendMessage.length < 250
            ? backendMessage
            : "No se han podido procesar los datos. Compruebe la información e inténtelo de nuevo.";
    }

    return "No se ha podido completar la solicitud. Inténtelo de nuevo.";
}

export async function request(endpoint, options = {}) {
    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...(options.body
                    ? { "Content-Type": "application/json" }
                    : {}),
                ...options.headers,
            },
        });
    } catch {
        throw new Error(
            "No se ha podido conectar con el servidor. Compruebe su conexión o inténtelo de nuevo más tarde."
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
        throw new Error(
            getErrorMessage(response.status, data, endpoint)
        );
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
