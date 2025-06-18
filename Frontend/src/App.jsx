import React, { useState, useEffect } from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBarMenu from "./components/SideBarMenu";
import HomePage from "./pages/HomePage";
import MyNetworkPage from "./pages/MyNetworkPage";
import MemoryLanePage from "./pages/MemoryLanePage";
import WatchAlongPage from "./pages/WatchAlongPage";
import Netflix from "./pages/Netflix";
import PrimeVideo from "./pages/PrimeVideo";
import Disney from "./pages/Disney";
import Hulu from "./pages/Hulu";
import YouTube from "./pages/YouTube";
import YouTubeMusic from "./pages/YouTubeMusic";
import Profile from "./pages/Profile";
import SleepTime from "./components/SleepTime";
import AllMovies from "./pages/AllMovies";
import AllSeries from "./pages/AllSeries";

const App = () => {
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const [showSleep, setShowSleep] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <SideBarMenu darkMode={darkMode} toggleTheme={toggleTheme} onOpenSleep={() => setShowSleep(true)} />
        <div className="flex-1 h-screen overflow-auto no-scrollbar">
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} toggleTheme={toggleTheme} />} />
            <Route path="/my-network" element={<MyNetworkPage darkMode={darkMode} />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} />} />
            <Route path="/memory-lane" element={<MemoryLanePage darkMode={darkMode} />} />
            <Route path="/watch-along" element={<WatchAlongPage darkMode={darkMode} />} />
            <Route path="/netflix" element={<Netflix />} />
            <Route path="/prime-video" element={<PrimeVideo />} />
            <Route path="/prime-video/movies" element={<AllMovies />} />
            <Route path="/prime-video/series" element={<AllSeries />} />
            <Route path="/disney" element={<Disney />} />
            <Route path="/hulu" element={<Hulu />} />
            <Route path="/youtube" element={<YouTube />} />
            <Route path="/youtube-music" element={<YouTubeMusic />} />
          </Routes>

          {showSleep && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowSleep(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <SleepTime onClose={() => setShowSleep(false)} darkMode={darkMode} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  );

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }
};

export default App;
