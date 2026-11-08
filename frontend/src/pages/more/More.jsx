import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    UserRound,
    CircleHelp,
    Mail,
    LogOut,
    ChevronRight,
    X,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import "./More.css";

const options = [
    {
        title: "Mi perfil",
        description: "Consulta tu información personal.",
        path: "/perfil",
        icon: UserRound,
    },
    {
        title: "Ayuda",
        description: "Descubre cómo utilizar AlzheCare.",
        path: "/ayuda",
        icon: CircleHelp,
    },
    {
        title: "Contacto",
        description: "Consulta nuestros canales de contacto.",
        path: "/contacto",
        icon: Mail,
    },
];

export default function More() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/publico", { replace: true });
    };

    return (
        <div className="more-page">
            <section className="more-heading">
                <span className="private-section-eyebrow">
                    TU CUENTA
                </span>
                <h1>Más opciones</h1>
                <p>
                    Gestiona tu cuenta y consulta otras opciones de AlzheCare.
                </p>
            </section>

            <section className="more-options">
                {options.map((option) => {
                    const Icon = option.icon;

                    return (
                        <Link
                            key={option.path}
                            to={option.path}
                            className="more-option"
                        >
                            <div className="more-option-icon">
                                <Icon size={22} strokeWidth={1.8} />
                            </div>

                            <div className="more-option-content">
                                <h2>{option.title}</h2>
                                <p>{option.description}</p>
                            </div>

                            <ChevronRight
                                size={20}
                                className="more-option-arrow"
                                aria-hidden="true"
                            />
                        </Link>
                    );
                })}
            </section>

            <section className="more-logout-section">
                <button
                    type="button"
                    className="more-logout-button"
                    onClick={() => setShowConfirmation(true)}
                >
                    <LogOut size={20} />
                    <span>Cerrar sesión</span>
                </button>
            </section>

            {showConfirmation && (
                <div
                    className="logout-overlay"
                    onClick={() => setShowConfirmation(false)}
                >
                    <div
                        className="logout-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="logout-title"
                        aria-describedby="logout-description"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="logout-close"
                            aria-label="Cerrar ventana"
                            onClick={() => setShowConfirmation(false)}
                        >
                            <X size={20} />
                        </button>

                        <div className="logout-icon">
                            <LogOut size={25} />
                        </div>

                        <h2 id="logout-title">¿Cerrar sesión?</h2>

                        <p id="logout-description">
                            ¿Estás seguro de que quieres cerrar tu sesión
                            en AlzheCare?
                        </p>

                        <div className="logout-actions">
                            <button
                                type="button"
                                className="logout-cancel"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="logout-confirm"
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}