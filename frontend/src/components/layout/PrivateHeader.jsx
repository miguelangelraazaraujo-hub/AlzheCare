import UserSummary from "../common/UserSummary";
import ModeSwitch from "../common/ModeSwitch";
import Logo from "../common/Logo";

import "./PrivateLayout.css";

export default function PrivateHeader() {

    return (
        <header className="private-header">
            <Logo to="/inicio" />

            <div className="private-header-user">
                <ModeSwitch />

                <UserSummary />
            </div>
        </header>
    );
}