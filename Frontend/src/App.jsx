import React, { useState, useEffect } from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBarMenu from "./components/SideBarMenu";
import HomePage from "./pages/HomePage";
import MyNetworkPage from "./pages/MyNetworkPage";
import MemoryLanePage from "./pages/MemoryLanePage";
import WatchAlongPage from "./pages/WatchAlongPage";

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
        <Router>
            <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
                <SideBarMenu darkMode={darkMode} toggleTheme={toggleTheme} />
                <div className="flex-1 h-screen overflow-auto">
                    <Routes>
                        <Route path="/" element={<HomePage darkMode={darkMode} toggleTheme={toggleTheme} />} />
                        <Route path="/my-network" element={<MyNetworkPage darkMode={darkMode} />} />
                        <Route path="/memory-lane" element={<MemoryLanePage darkMode={darkMode} />} />
                        <Route path="/watch-along" element={<WatchAlongPage darkMode={darkMode} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;