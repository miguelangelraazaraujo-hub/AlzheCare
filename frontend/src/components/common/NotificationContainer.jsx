import {
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
    X,
} from "lucide-react";

import { useNotification } from "../../contexts/NotificationContext";
import "./NotificationContainer.css";

const notificationConfig = {
    success: {
        icon: CheckCircle2,
        title: "Operación completada",
        role: "status",
    },
    error: {
        icon: AlertCircle,
        title: "Ha ocurrido un error",
        role: "alert",
    },
    warning: {
        icon: AlertTriangle,
        title: "Aviso",
        role: "status",
    },
    info: {
        icon: Info,
        title: "Información",
        role: "status",
    },
};

export default function NotificationContainer() {
    const { notifications, dismissNotification } = useNotification();

    return (
        <div
            className="notification-container"
            aria-live="polite"
            aria-relevant="additions removals"
        >
            {notifications.map((notification) => {
                const config =
                    notificationConfig[notification.type] ||
                    notificationConfig.info;

                const Icon = config.icon;

                return (
                    <div
                        key={notification.id}
                        className={`notification notification-${notification.type}`}
                        role={config.role}
                    >
                        <Icon
                            className="notification-icon"
                            size={22}
                            aria-hidden="true"
                        />

                        <div className="notification-content">
                            <strong>{config.title}</strong>
                            <p>{notification.message}</p>
                        </div>

                        <button
                            type="button"
                            className="notification-close"
                            onClick={() =>
                                dismissNotification(notification.id)
                            }
                            aria-label="Cerrar notificación"
                        >
                            <X size={18} aria-hidden="true" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}