import { Link } from "react-router";
import {
    Search,
    LayoutGrid,
    UserRound,
    CircleHelp,
    Mail,
    ArrowRight,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import "./PrivateHome.css";

const shortcuts = [
    {
        title: "Buscar artículos",
        description: "Encuentra información sobre el Alzheimer.",
        path: "/buscar",
        icon: Search,
        style: "blue",
    },
    {
        title: "Categorías",
        description: "Explora los contenidos por temática.",
        path: "/categorias",
        icon: LayoutGrid,
        style: "purple",
    },
    {
        title: "Perfil",
        description: "Consulta tu información personal.",
        path: "/perfil",
        icon: UserRound,
        style: "teal",
    },
    {
        title: "Ayuda",
        description: "Descubre cómo utilizar AlzheCare.",
        path: "/ayuda",
        icon: CircleHelp,
        style: "amber",
    },
    {
        title: "Contacto",
        description: "Encuentra nuestros canales de contacto.",
        path: "/contacto",
        icon: Mail,
        style: "blue",
    },
];

export default function PrivateHome() {
    const { user } = useAuth();

    const firstName = user?.nombre?.trim().split(/\s+/)[0] || "usuario";

    const roleLabel = user?.rol === "PATIENT" ? "paciente" : "cuidador";

    return (
        <div className="private-home">
            <section className="private-welcome">
                <span className="private-eyebrow">
                    TU ESPACIO PERSONAL
                </span>

                <h1>¡Bienvenido/a, {firstName}!</h1>

                <p>
                    Este es tu espacio en AlzheCare. Aquí encontrarás
                    recursos y herramientas de apoyo adaptados a ti.
                </p>

                <span className="private-role-label">
                    Cuenta de {roleLabel}
                </span>
            </section>

            <section className="private-shortcuts">
                <div className="private-section-heading">
                    <div>
                        <span className="private-section-eyebrow">
                            ACCESOS DIRECTOS
                        </span>
                        <h2>¿Qué necesitas hoy?</h2>
                    </div>
                </div>

                <div className="private-shortcut-grid">
                    {shortcuts.map((shortcut) => {
                        const Icon = shortcut.icon;

                        return (
                            <Link
                                key={shortcut.path}
                                to={shortcut.path}
                                className="private-shortcut-card"
                            >
                                <div className={`private-shortcut-icon ${shortcut.style}`}>
                                    <Icon size={23} strokeWidth={1.8} />
                                </div>

                                <h3>{shortcut.title}</h3>
                                <p>{shortcut.description}</p>

                                <ArrowRight
                                    className="private-shortcut-arrow"
                                    size={17}
                                    aria-hidden="true"
                                />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}