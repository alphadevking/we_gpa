import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeSwitch: React.FC = () => {
    const { isDark, setIsDark } = useContext(ThemeContext);

    //this way, it doesn't switch back to light when the user refrshes the page
    function handleSwitch(isDark: boolean) {
        localStorage.setItem("isDark", String(isDark));
        setIsDark(isDark)
    }

    return (
        <div className={`${isDark ? "bg-dark" : "bg-light"}`}>
            <button onClick={() => handleSwitch(!isDark)}>
                {!isDark ? <FiSun /> : <FiMoon />}
                {/* Toggle theme */}
            </button>
        </div>
    );
};