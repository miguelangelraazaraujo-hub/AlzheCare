import { useTheme } from "../../contexts/ThemeContext";

function ModeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="switch-mode" onClick={toggleTheme}>
      {theme === 'light' ? "☀️ " : "🌙 "}
    </button>
  );
}

export default ModeSwitch;