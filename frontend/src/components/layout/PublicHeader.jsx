
import { Link } from "react-router";
import { UserRound } from "lucide-react";
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
                <UserRound
                    className="account-icon"
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
                <span>Invitado</span>
            </Link>
        </header>
    );
}