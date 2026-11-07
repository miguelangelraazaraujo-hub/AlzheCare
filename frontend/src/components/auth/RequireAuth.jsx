
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function RequireAuth({ allowedRoles }) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        return <Navigate to="/acceso" replace />;
    }

    return <Outlet />;
}
