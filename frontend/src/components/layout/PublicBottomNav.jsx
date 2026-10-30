
import { NavLink } from "react-router";

const items = [
  { label: "Inicio", path: "/publico", icon: "⌂", end: true },
  { label: "Categorías", path: "/publico/categorias", icon: "▦" },
  { label: "Ayuda", path: "/publico/ayuda", icon: "?" },
  { label: "Cuenta", path: "/login", icon: "○" },
];

export default function PublicBottomNav() {
  return (
    <nav className="public-bottom-nav" aria-label="Navegación principal">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="bottom-nav-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}