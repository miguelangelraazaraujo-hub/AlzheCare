

import {
    House,
    LayoutGrid,
    CircleHelp,
    UserRound,
} from "lucide-react";

import BottomNavigation from "./BottomNavigation";

const items = [
    { label: "Inicio", path: "/publico", icon: House, end: true },
    { label: "Categorías", path: "/publico/categorias", icon: LayoutGrid },
    { label: "Ayuda", path: "/publico/ayuda", icon: CircleHelp },
    { label: "Cuenta", path: "/login", icon: UserRound },
];

export default function PublicBottomNav() {
    return (
        <BottomNavigation
            items={items}
            ariaLabel="Navegación principal"
        />
    );
}