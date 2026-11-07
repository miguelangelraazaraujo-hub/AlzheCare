
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function GuestRoute() {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to={user.rol === "PATIENT"
                    ? "/paciente/inicio"
                    : "/cuidador/inicio"}
                replace
            />
        );
    }

    return <Outlet />;
}
