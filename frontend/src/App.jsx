import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";

import { WelcomeProvider } from "./contexts/WelcomeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationContainer from "./components/common/NotificationContainer";
import SessionExpiredModal from "./components/common/SessionExpiredModal";

// Páginas cargadas bajo demanda
const PlaceholderPage = lazy(() => import("./components/common/PlaceholderPage"));
const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));

const GuestRoute = lazy(() => import("./components/auth/GuestRoute"));
const PrivateLayout = lazy(() => import("./components/layout/PrivateLayout"));
const Welcome = lazy(() => import("./pages/welcome/Welcome"));
const PublicHome = lazy(() => import("./pages/public-home/PublicHome"));
const PublicCategories = lazy(() => import("./pages/public-categories/PublicCategories"));

const Login = lazy(() => import("./pages/auth/Login"));
const RegisterRole = lazy(() => import("./pages/auth/RegisterRole"));
const Register = lazy(() => import("./pages/auth/Register"));

const PrivateHome = lazy(() => import("./pages/private-home/PrivateHome"));
const More = lazy(() => import("./pages/more/More"));

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

function PageLoader() {
    return (
        <div className="page-loader" role="status">
            Cargando página...
        </div>
    );
}

export default function App() {
    return (
        <NotificationProvider>
            <NotificationContainer />
            <SessionExpiredModal />

            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<WelcomeRoute />} />

                    <Route path="/bienvenida" element={<WelcomeRoute />} />

                    <Route element={<GuestRoute allowAuthenticated />}>
                        <Route path="/publico" element={<PublicHome />} />
                        <Route
                            path="/publico/categorias"
                            element={<PublicCategories />}
                        />
                        <Route
                            path="/publico/ayuda"
                            element={<PlaceholderPage title="Ayuda" />}
                        />
                    </Route>

                    <Route
                        path="/publico/busqueda"
                        element={<Navigate to="/publico/categorias" replace />}
                    />

                    <Route
                        path="/publico/resultados"
                        element={<Navigate to="/publico/categorias" replace />}
                    />

                    <Route
                        path="/publico/articulo/:id"
                        element={<PlaceholderPage title="Detalle del artículo" />}
                    />

                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro" element={<RegisterRole />} />
                        <Route path="/registro/:rol" element={<Register />} />
                    </Route>

                    <Route
                        element={
                            <RequireAuth allowedRoles={["PATIENT", "CAREGIVER"]} />
                        }
                    >
                        <Route element={<PrivateLayout />}>
                            <Route path="/inicio" element={<PrivateHome />} />

                            <Route
                                path="/categorias"
                                element={
                                    <Navigate
                                        to="/publico/categorias"
                                        replace
                                    />
                                }
                            />

                            <Route path="/mas" element={<More />} />

                            <Route
                                path="/perfil"
                                element={<PlaceholderPage title="Perfil" />}
                            />

                            <Route
                                path="/ayuda"
                                element={<PlaceholderPage title="Ayuda" />}
                            />

                            <Route
                                path="/contacto"
                                element={<PlaceholderPage title="Contacto" />}
                            />
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
                        element={
                            <PlaceholderPage title="Acceso no autorizado" />
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </NotificationProvider>
    );
}