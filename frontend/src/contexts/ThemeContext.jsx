
import { createContext, useContext, useState, useEffect } from "react";

// 1. Crear el contexto
const ThemeContext = createContext();

// 2. Crear el Provider
export function ThemeProvider({ children }) {

    // Estado del tema
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    // Cambiar el tema
    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === "light" ? "dark" : "light"
        );
    };

    // Aplicar el tema y guardarlo
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Compartir los valores
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Hook personalizado para consumir el contexto
export function useTheme() {
    return useContext(ThemeContext);
}