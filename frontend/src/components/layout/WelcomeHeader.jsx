
import ModeSwitch from "../common/ModeSwitch";
import { useWelcome } from "../../contexts/WelcomeContext";
import { useTheme } from "../../contexts/ThemeContext";
import logoLight from "../../assets/AlzheCare.png";
import logoDark from "../../assets/AlzheCare-dark.png";

export default function WelcomeHeader() {

    const { isLastSlide, finishIntro } = useWelcome();

    const { theme } = useTheme();

    return (
        <header className="welcome-header">
            <div className="brand">
                <div className="brand-mark" aria-hidden="true">
                    <img
                        src={theme === 'dark' ? logoDark : logoLight}
                        height={35}
                        width={35}
                        alt="AlzheCare"
                    />
                </div>
                <span>AlzheCare</span>
            </div>

            <ModeSwitch />

            {!isLastSlide && (
                <button className="skip-button" onClick={finishIntro}>
                    Saltar introducción
                </button>
            )}
        </header>
    );
}