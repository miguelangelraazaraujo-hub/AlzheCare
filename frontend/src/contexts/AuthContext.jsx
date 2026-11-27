import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import authService, {
    setUnauthorizedHandler,
} from "../services/authService";

const AuthContext = createContext(null);

const TOKEN_KEY = "alzhecare_token";
const SESSION_EXPIRED_KEY = "alzhecare_session_expired";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [sessionExpired, setSessionExpired] = useState(() => {
        const expired = sessionStorage.getItem(SESSION_EXPIRED_KEY);

        if (expired) {
            sessionStorage.removeItem(SESSION_EXPIRED_KEY);
            return true;
        }

        return false;
    });

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

                    setSessionExpired(true);
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

    useEffect(() => {
        setUnauthorizedHandler(() => {
            localStorage.removeItem(TOKEN_KEY);
            setToken(null);
            setUser(null);

            sessionStorage.setItem(SESSION_EXPIRED_KEY, "true");

            window.location.href = "/publico";
        });

        return () => {
            setUnauthorizedHandler(null);
        };
    }, []);

    function saveSession(authResponse) {
        const { token: newToken, user: newUser } = authResponse;

        localStorage.setItem(TOKEN_KEY, newToken);

        setToken(newToken);
        setUser(newUser);
        setSessionExpired(false);
    }

    function updateSession(authResponse) {
        saveSession(authResponse);
    }

    async function login(credentials) {
        const response = await authService.login(credentials);
        saveSession(response);
        return response.user;
    }

    async function register(userData) {
        const response = await authService.register(userData);
        saveSession(response);
        return response.user;
    }

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        setSessionExpired(false);
    }

    function dismissSessionExpired() {
        setSessionExpired(false);
    }

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(user && token),
        sessionExpired,
        dismissSessionExpired,
        login,
        register,
        logout,
        updateSession,
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