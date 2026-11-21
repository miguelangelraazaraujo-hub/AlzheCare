import { useAuth } from "../../contexts/AuthContext";
import { UserRound } from "lucide-react";

import "./UserSummary.css";

export default function UserSummary() {
    const { user, isAuthenticated } = useAuth();

    const initials = `${user?.nombre?.[0] ?? ""}${user?.apellidos?.[0] ?? ""}`
        .toUpperCase();

    const roleLabel = user?.rol === "PATIENT" ? "Paciente"
        : user?.rol === "CAREGIVER"
            ? "Cuidador"
            : "";

    return (

        <div className="user-summary">
            <div className="avatar" aria-label={isAuthenticated
                ? `Usuario ${user?.nombre ?? ""} ${user?.apellidos ?? ""}`.trim()
                : "Invitado"}
            >
                {isAuthenticated && initials ? (
                    initials
                ) : (
                    <UserRound
                        className="account-icon"
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                )}
            </div>

            <div className="user-info">
                <strong>
                    {isAuthenticated
                        ? user?.nombre ?? "Usuario"
                        : "Invitado"}
                </strong>
                <span>
                    {isAuthenticated ? roleLabel : "Guest"}
                </span>
            </div>
        </div>
    );
}