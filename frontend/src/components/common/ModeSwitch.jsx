import { useTheme } from "../../contexts/ThemeContext";

function ModeSwitch() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button className="switch-mode" onClick={toggleTheme}>
      {darkMode ? "☀️ " : "🌙 "}
    </button>
  );
}

export default ModeSwitch;