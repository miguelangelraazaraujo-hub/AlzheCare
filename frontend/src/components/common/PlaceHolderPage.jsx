import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function PlaceholderPage({ title }) {
    const { isAuthenticated } = useAuth();

    const homePath = isAuthenticated ? "/inicio" : "/publico";
    const homeLabel = isAuthenticated
        ? "Ir a mi inicio"
        : "Ir al inicio público";

    return (
        <main className="placeholder-page">
            <div className="placeholder-card">
                <span className="welcome-eyebrow">ALZHECARE</span>
                <h1>{title}</h1>
                <p>
                    Esta sección estará disponible en una próxima fase
                    del proyecto.
                </p>

                <Link className="primary-button" to={homePath}>
                    {homeLabel}
                </Link>
            </div>
        </main>
    );
}