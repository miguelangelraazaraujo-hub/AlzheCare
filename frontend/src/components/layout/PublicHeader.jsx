import ModeSwitch from "../common/ModeSwitch";
import Logo from "../common/Logo";
import UserSummary from "../common/UserSummary";
import "./PublicHeader.css";

export default function PublicHeader() {

    return (
        <header className="public-header">
            <Logo to="/publico" />
            <div className="public-header-user">
                <ModeSwitch />

                <UserSummary />
            </div>
        </header>
    );
}