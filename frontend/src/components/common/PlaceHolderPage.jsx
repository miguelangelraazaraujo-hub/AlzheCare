
import { Link } from "react-router";

export default function PlaceholderPage({ title }) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-card">
        <span className="welcome-eyebrow">ALZHECARE</span>
        <h1>{title}</h1>
        <p>Esta sección estará disponible en una próxima fase del proyecto.</p>
        <Link className="primary-button" to="/publico">
          Ir al inicio público
        </Link>
      </div>
    </main>
  );
}
