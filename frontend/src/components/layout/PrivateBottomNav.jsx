import {
    House,
    BookOpen,
    Menu,
} from "lucide-react";

import BottomNavigation from "./BottomNavigation";

const items = [
    { label: "Inicio", path: "/inicio", icon: House, end: true },
    { label: "Artículos", path: "/publico/categorias", icon: BookOpen },
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