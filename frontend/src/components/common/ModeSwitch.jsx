import { useState, useEffect } from "react";

function ModeSwitch() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <button className="switch-mode" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️ " : "🌙 "}
    </button>
  );
}

export default ModeSwitch;