
import { Link } from "react-router";
import ModeSwitch from "../common/ModeSwitch";
import { useTheme } from "../../contexts/ThemeContext";
import logoLight from "../../assets/AlzheCare.png";
import logoDark from "../../assets/AlzheCare-dark.png";

export default function PublicHeader() {

    const { theme } = useTheme();

    return (
        <header className="public-header">
            <Link to="/publico" className="public-brand" aria-label="AlzheCare, inicio">
                <div className="public-brand-mark" aria-hidden="true">
                    <img
                        src={theme === 'dark' ? logoDark : logoLight}
                        height={30}
                        width={30}
                        alt="AlzheCare"
                    />
                </div>
                <span>AlzheCare</span>
            </Link>

            <ModeSwitch />

            <Link to="/login" className="account-link">
                <span className="account-icon" aria-hidden="true">○</span>
                <span>Invitado</span>
            </Link>
        </header>
    );
}