import { useTheme } from "../../contexts/ThemeContext";

import logoLight from "../../assets/AlzheCare.png";
import logoDark from "../../assets/AlzheCare-dark.png";

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