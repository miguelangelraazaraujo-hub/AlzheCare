import { useTheme } from "../../contexts/ThemeContext";

import logoLight from "../../assets/AlzheCare65.png";
import logoDark from "../../assets/AlzheCare-dark65.png";

export default function LogoMode( {w , h}) {
    const { theme } = useTheme();
    const width = w;
    const height = h;

    return (

        <img
            src={theme === "dark" ? logoDark : logoLight}
            width={width}
            height={height}
            alt="AlzheCare"
        />
    );
}