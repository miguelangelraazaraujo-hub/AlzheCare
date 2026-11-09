
import { Link } from "react-router";
import { UserRound } from "lucide-react";
import ModeSwitch from "../common/ModeSwitch";
import Logo from "../common/Logo";

export default function PublicHeader() {

    return (
        <header className="public-header">
            <Logo to="/publico" />

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