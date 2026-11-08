import { Link } from "react-router";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

import logoLight from "../../assets/AlzheCare.png";
import logoDark from "../../assets/AlzheCare-dark.png";

export default function Logo({ to }) {
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();

    const destination = to ?? (isAuthenticated ? "/inicio" : "/bienvenida");

    return (
        <Link
            to={destination}
            className="brand"
            aria-label="AlzheCare, ir al inicio"
        >
            <span className="brand-mark">
                <img
                    src={theme === "dark" ? logoDark : logoLight}
                    width={35}
                    height={35}
                    alt="AlzheCare"
                />
            </span>

            <span className="auth-brand">AlzheCare</span>
        </Link>
    );
}