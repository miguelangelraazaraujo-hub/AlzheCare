import {
    House,
    BookOpen,
    CircleHelp,
    UserRound,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import BottomNavigation from "./BottomNavigation";

export default function PublicBottomNav() {
    const { isAuthenticated } = useAuth();

    const items = [
        { label: "Inicio", path: "/publico", icon: House, end: true },
        { label: "Artículos", path: "/publico/categorias", icon: BookOpen },
        { label: "Ayuda", path: "/publico/ayuda", icon: CircleHelp },
        {
            label: isAuthenticated ? "Perfil" : "Cuenta",
            path: isAuthenticated ? "/perfil" : "/login",
            icon: UserRound,
        },
    ];

    return (
        <BottomNavigation
            items={items}
            ariaLabel="Navegación principal"
        />
    );
}