
import { useState } from "react";
import Welcome from "./pages/Welcome";

const destinations = {
  public: {
    title: "Información pública",
    description: "Aquí incorporaremos el buscador, las categorías y los artículos.",
  },
  login: {
    title: "Iniciar sesión",
    description: "Aquí incorporaremos el formulario de acceso de AlzheCare.",
  },
  register: {
    title: "Crear cuenta",
    description: "Aquí incorporaremos el registro de pacientes y cuidadores.",
  },
};

export default function App() {
  const [destination, setDestination] = useState(null);

  if (!destination) {
    return <Welcome onNavigate={setDestination} />;
  }

  const page = destinations[destination];

  return (
    <main className="welcome-page">
      <section className="welcome-card access-screen">
        <span className="welcome-eyebrow">ALZHECARE</span>
        <h1>{page.title}</h1>
        <p className="access-description">{page.description}</p>
        <button
          className="primary-button"
          onClick={() => setDestination(null)}
        >
          Volver al inicio
        </button>
      </section>
    </main>
  );
}
