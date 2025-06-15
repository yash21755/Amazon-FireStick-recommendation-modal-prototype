import React from "react";
import SideBarMenu from "../components/SideBarMenu";
import HomeBanner from "../components/HomeBanner";
const HomePage = ({ darkMode, toggleTheme }) => {
    return (
        <div className="flex flex-row h-screen">
            <SideBarMenu darkMode={darkMode} toggleTheme={toggleTheme} />
            <div className="flex-1">
                <HomeBanner />
            </div>
        </div>
    );
}

export default HomePage;