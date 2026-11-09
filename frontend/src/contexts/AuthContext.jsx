
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

const TOKEN_KEY = "alzhecare_token";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Recuperar y validar la sesión al iniciar la aplicación.
    useEffect(() => {
        let active = true;

        async function restoreSession() {
            const storedToken = localStorage.getItem(TOKEN_KEY);

            if (!storedToken) {
                if (active) setIsLoading(false);
                return;
            }

            try {
                const currentUser = await authService.getCurrentUser(
                    storedToken
                );

                if (active) {
                    setToken(storedToken);
                    setUser(currentUser);
                }
            } catch {
                localStorage.removeItem(TOKEN_KEY);

                if (active) {
                    setToken(null);
                    setUser(null);
                }
            } finally {
                if (active) setIsLoading(false);
            }
        }

        restoreSession();

        return () => {
            active = false;
        };
    }, []);

    // Guardar los datos de una sesión autenticada.
    function saveSession(authResponse) {
        const { token: newToken, user: newUser } = authResponse;

        localStorage.setItem(TOKEN_KEY, newToken);

        setToken(newToken);
        setUser(newUser);
    }

    // Iniciar sesión.
    async function login(credentials) {
        const response = await authService.login(credentials);
        saveSession(response);

        return response.user;
    }

    // Registrar una cuenta.
    async function register(userData) {
        const response = await authService.register(userData);
        saveSession(response);

        return response.user;
    }

    // Cerrar sesión.
    function logout() {
        localStorage.removeItem(TOKEN_KEY);

        setToken(null);
        setUser(null);
    }

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de un AuthProvider."
        );
    }

    return context;
}
