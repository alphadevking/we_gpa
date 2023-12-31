"use client"
import React from "react";

interface ThemeContextProps {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    isDark: false,
    setIsDark: () => { },
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDark, setIsDark] = React.useState(false); // Default theme is white

    // On component mount, we check if the user has a preferred theme
    React.useEffect(() => {
        const isDarkUserSetting = localStorage.getItem("isDark") === "true";
        setIsDark(isDarkUserSetting);
    }, []);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }
        }>
            {children}
        </ThemeContext.Provider>
    );
};