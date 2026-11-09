
import ModeSwitch from "../common/ModeSwitch";
import Logo from "../common/Logo";
import { useWelcome } from "../../contexts/WelcomeContext";

export default function WelcomeHeader() {

    const { isLastSlide, finishIntro } = useWelcome();

    return (
        <header className="welcome-header">
            <Logo />

            <ModeSwitch />

            {!isLastSlide && (
                <button className="skip-button" onClick={finishIntro}>
                    Saltar introducción
                </button>
            )}
        </header>
    );
}