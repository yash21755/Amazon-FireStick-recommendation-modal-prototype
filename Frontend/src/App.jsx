import React, { useState, useEffect } from "react";
import "./style.css";
import Remote from "./components/Remote";
import HomePage from "./pages/HomePage";

const App = () => {
    // Theme logic at the top level
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem("theme");
        return stored ? stored === "dark" : true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* <Remote/>  */}
            <HomePage darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
    );
}

export default App;