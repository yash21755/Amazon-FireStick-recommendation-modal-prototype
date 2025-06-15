import React from "react";
import HomeBanner from "../components/HomeBanner";
import HomeContentSection from "../components/HomeContentSection";

const HomePage = ({ darkMode, toggleTheme }) => {
    return (
        <div className="flex-1 flex flex-col h-full">
            <HomeBanner />
            <HomeContentSection darkMode={darkMode} />
        </div>
    );
}

export default HomePage;