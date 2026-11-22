import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function GuestRoute({ allowAuthenticated = false }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (isAuthenticated && !allowAuthenticated) {
        return <Navigate to="/inicio" replace />;
    }

    return <Outlet />;
}