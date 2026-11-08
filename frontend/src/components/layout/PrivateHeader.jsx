import { Link } from "react-router";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import ModeSwitch from "../common/ModeSwitch";

import logoLight from "../../assets/AlzheCare.png";
import logoDark from "../../assets/AlzheCare-dark.png";

import "./PrivateLayout.css";

export default function PrivateHeader() {
    const { theme } = useTheme();
    const { user } = useAuth();

    const initials = `${user?.nombre?.[0] ?? ""}${user?.apellidos?.[0] ?? ""}`
        .toUpperCase();

    const roleLabel = user?.rol === "PATIENT" ? "Paciente" : "Cuidador";

    return (
        <header className="private-header">
            <Link to="/inicio" className="private-brand" aria-label="AlzheCare, inicio">
                <img
                    src={theme === "dark" ? logoDark : logoLight}
                    alt=""
                    width={36}
                    height={36}
                />
                <span>AlzheCare</span>
            </Link>

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