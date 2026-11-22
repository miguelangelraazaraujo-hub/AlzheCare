import { useTheme } from "../../contexts/ThemeContext";

function ModeSwitch() {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";
    
    return (
        <button
            type="button"
            className="switch-mode"
            onClick={toggleTheme}
            aria-label="Modo oscuro"
            aria-pressed={isDark}
            title={isDark ? "Desactivar modo oscuro" : "Activar modo oscuro"}
        >
            <span aria-hidden="true">
                {isDark ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

export default ModeSwitch;