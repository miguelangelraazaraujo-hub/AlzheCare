
import { createContext, useContext, useState } from "react";

const WelcomeContext = createContext();

export function WelcomeProvider({ children }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const isLastSlide = currentSlide === 3;

    const nextSlide = () => {
        setCurrentSlide(current => Math.min(current + 1, 3));
    };

    const previousSlide = () => {
        setCurrentSlide(current => Math.max(current - 1, 0));
    };

    const finishIntro = () => {
        setCurrentSlide(3);
    };

    return (
        <WelcomeContext.Provider
            value={{
                currentSlide,
                setCurrentSlide,
                isLastSlide,
                nextSlide,
                previousSlide,
                finishIntro
            }}
        >
            {children}
        </WelcomeContext.Provider>
    );
}

export function useWelcome() {
    return useContext(WelcomeContext);
}
