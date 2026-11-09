import { NavLink } from "react-router";
import "./BottomNavigation.css";

export default function BottomNavigation({ items, ariaLabel }) {
    return (
        <nav className="app-bottom-nav" aria-label={ariaLabel}>
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `app-bottom-nav-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Icon strokeWidth={1.8} aria-hidden="true" />
                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}