
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
    const notificationsRef = useRef([]);

    const dismissNotification = useCallback((id) => {
        const timer = timers.current.get(id);

        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }

        notificationsRef.current = notificationsRef.current.filter(
            (notification) => notification.id !== id
        );

        setNotifications(notificationsRef.current);
    }, []);

    const notify = useCallback((message, type = "info", duration = 5000) => {
        // Evitar notificaciones duplicadas mientras la original siga activa.
        const existing = notificationsRef.current.find(
            (notification) =>
                notification.message === message &&
                notification.type === type
        );

        if (existing) {
            return existing.id;
        }

        const id = ++nextId.current;

        const newNotification = { id, message, type };

        notificationsRef.current = [
            ...notificationsRef.current,
            newNotification,
        ];

        setNotifications(notificationsRef.current);

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

        notificationsRef.current = [];
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
