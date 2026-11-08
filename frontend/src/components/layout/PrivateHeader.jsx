import { useAuth } from "../../contexts/AuthContext";
import ModeSwitch from "../common/ModeSwitch";
import Logo from "../common/Logo";

import "./PrivateLayout.css";

export default function PrivateHeader() {
    const { user } = useAuth();

    const initials = `${user?.nombre?.[0] ?? ""}${user?.apellidos?.[0] ?? ""}`
        .toUpperCase();

    const roleLabel = user?.rol === "PATIENT" ? "Paciente" : "Cuidador";

    return (
        <header className="private-header">
            <Logo to="/inicio" />

            <div className="private-header-user">
                <ModeSwitch />

                <div className="private-user-summary">
                    <div className="private-avatar" aria-hidden="true">
                        {initials}
                    </div>

                    <div className="private-user-info">
                        <strong>{user?.nombre}</strong>
                        <span>{roleLabel}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}