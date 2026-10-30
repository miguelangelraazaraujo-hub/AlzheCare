
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Welcome from "./pages/welcome/Welcome";
import PublicHome from "./pages/public-home/PublicHome";
import PlaceholderPage from "./components/common/PlaceholderPage";

function WelcomeRoute() {
  const navigate = useNavigate();

  const handleNavigate = (destination) => {
    const routes = {
      public: "/publico",
      login: "/login",
      register: "/registro",
    };

    navigate(routes[destination] ?? "/");
  };

  return <Welcome onNavigate={handleNavigate} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeRoute />} />

      <Route path="/publico" element={<PublicHome />} />

      <Route
        path="/publico/categorias"
        element={<PlaceholderPage title="Categorías" />}
      />
      <Route
        path="/publico/busqueda"
        element={<PlaceholderPage title="Buscar información" />}
      />
      <Route
        path="/publico/resultados"
        element={<PlaceholderPage title="Resultados de búsqueda" />}
      />
      <Route
        path="/publico/articulo/:id"
        element={<PlaceholderPage title="Detalle del artículo" />}
      />
      <Route
        path="/publico/ayuda"
        element={<PlaceholderPage title="Ayuda" />}
      />

      <Route
        path="/login"
        element={<PlaceholderPage title="Iniciar sesión" />}
      />
      <Route
        path="/registro"
        element={<PlaceholderPage title="Crear cuenta" />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
