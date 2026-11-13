
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const timers = useRef(new Map());
    const nextId = useRef(0);

    const dismissNotification = useCallback((id) => {
        const timer = timers.current.get(id);

        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }

        setNotifications((current) =>
            current.filter((notification) => notification.id !== id)
        );
    }, []);

    const notify = useCallback((message, type = "info", duration = 5000) => {
        const id = ++nextId.current;

        setNotifications((current) => [
            ...current,
            { id, message, type },
        ]);

        if (duration > 0) {
            const timer = setTimeout(() => {
                dismissNotification(id);
            }, duration);

            timers.current.set(id, timer);
        }

        return id;
    }, [dismissNotification]);

    const clearNotifications = useCallback(() => {
        timers.current.forEach((timer) => clearTimeout(timer));
        timers.current.clear();
        setNotifications([]);
    }, []);

    useEffect(() => {
        return () => {
            timers.current.forEach((timer) => clearTimeout(timer));
            timers.current.clear();
        };
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                notify,
                dismissNotification,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification debe utilizarse dentro de NotificationProvider."
        );
    }

    return context;
}
