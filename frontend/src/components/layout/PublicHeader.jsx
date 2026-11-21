import { Link } from "react-router";
import { UserRound } from "lucide-react";
import ModeSwitch from "../common/ModeSwitch";
import Logo from "../common/Logo";
import { useAuth } from "../../contexts/AuthContext";
import "./PublicHeader.css";

export default function PublicHeader() {
    const { isAuthenticated } = useAuth();

    return (
        <header className="public-header">
            <Logo to="/publico" />

            <ModeSwitch />

            <Link
                to={isAuthenticated ? "/perfil" : "/login"}
                className="account-link"
            >
                <UserRound
                    className="account-icon"
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
                <span>{isAuthenticated ? "Perfil" : "Invitado"}</span>
            </Link>
        </header>
    );
}