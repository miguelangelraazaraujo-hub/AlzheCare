import { useAuth } from "../../contexts/AuthContext";
import "./SessionExpiredModal.css";

export default function SessionExpiredModal() {
    const {
        sessionExpired,
        dismissSessionExpired,
    } = useAuth();

    if (!sessionExpired) return null;

    return (
        <div className="session-expired-overlay">
            <div
                className="session-expired-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="session-expired-title"
            >
                <div className="session-expired-icon">
                    !
                </div>

                <h2 id="session-expired-title">
                    Sesión finalizada
                </h2>

                <p>
                    Tu sesión ha caducado o ha dejado de ser válida.
                    Por seguridad, hemos cerrado tu sesión.
                </p>

                <p>
                    Inicia sesión de nuevo para continuar utilizando
                    AlzheCare.
                </p>

                <button
                    type="button"
                    onClick={dismissSessionExpired}
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}