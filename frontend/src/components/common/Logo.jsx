import { Link } from "react-router"; 
import { useTheme } from "../../contexts/ThemeContext";
import logoLight from "../../assets/AlzheCare.png";
import logoDark from "../../assets/AlzheCare-dark.png";

export default function Logo() {
    const { theme } = useTheme();

    return (
        <div className="brand">
            <div className="brand-mark" aria-hidden="true">
                <img
                    src={theme === 'dark' ? logoDark : logoLight}
                    height={35}
                    width={35}
                    alt="AlzheCare"
                />
            </div>
            <Link to="/bienvenida" className="auth-brand">
                        AlzheCare
            </Link>
        </div>
    );

}