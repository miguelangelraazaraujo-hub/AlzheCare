
import { Navigate, Route, Routes, useNavigate } from "react-router";

import Welcome from "./pages/welcome/Welcome";
import PublicHome from "./pages/public-home/PublicHome";
import Login from "./pages/auth/Login";
import RegisterRole from "./pages/auth/RegisterRole";
import Register from "./pages/auth/Register";
import PrivateHome from "./pages/private-home/PrivateHome";

import PlaceholderPage from "./components/common/PlaceholderPage";
import { WelcomeProvider } from "./contexts/WelcomeContext";
import RequireAuth from "./components/auth/RequireAuth";
import GuestRoute from "./components/auth/GuestRoute";
import PrivateLayout from "./components/layout/PrivateLayout";

function WelcomeRoute() {
    const navigate = useNavigate();

    const handleNavigate = (destination) => {
        const routes = {
            welcome: "/bienvenida",
            public: "/publico",
            login: "/login",
            register: "/registro",
        };

        navigate(routes[destination] ?? "/");
    };

    return (
        <WelcomeProvider>
            <Welcome onNavigate={handleNavigate} />
        </WelcomeProvider>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomeRoute />} />

            <Route path="/bienvenida" element={<WelcomeRoute />} />

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

            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<RegisterRole />} />
                <Route path="/registro/:rol" element={<Register />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["PATIENT", "CAREGIVER"]} />}>
                <Route element={<PrivateLayout />}>
                    <Route path="/inicio" element={<PrivateHome />} />

                    <Route path="/buscar" element={<PlaceholderPage title="Buscar artículos" />} />
                    <Route path="/categorias" element={<PlaceholderPage title="Categorías" />} />
                    <Route path="/mas" element={<PlaceholderPage title="Más opciones" />} />
                    <Route path="/perfil" element={<PlaceholderPage title="Perfil" />} />
                    <Route path="/ayuda" element={<PlaceholderPage title="Ayuda" />} />
                    <Route path="/contacto" element={<PlaceholderPage title="Contacto" />} />
                </Route>
            </Route>

            <Route
                path="/paciente/inicio"
                element={<Navigate to="/inicio" replace />}
            />

            <Route
                path="/cuidador/inicio"
                element={<Navigate to="/inicio" replace />}
            />

            <Route
                path="/acceso"
                element={<PlaceholderPage title="Acceso no autorizado" />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
