import {
    House,
    Search,
    LayoutGrid,
    Menu,
} from "lucide-react";

import BottomNavigation from "./BottomNavigation";

const items = [
    { label: "Inicio", path: "/inicio", icon: House, end: true },
    { label: "Buscar", path: "/buscar", icon: Search },
    { label: "Categorías", path: "/categorias", icon: LayoutGrid },
    { label: "Más", path: "/mas", icon: Menu },
];

export default function PrivateBottomNav() {
    return (
        <BottomNavigation
            items={items}
            ariaLabel="Navegación del área personal"
        />
    );
}