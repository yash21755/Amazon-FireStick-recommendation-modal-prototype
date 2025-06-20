import React, { useState } from "react";
import Applications from "./Applications";
import Games from "./Games";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomSection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("applications");
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  const isFullScreen =
    activeTab === "myNetwork" || activeTab === "watchAlong" || activeTab === "memoryLane";

  const renderComponent = () => {
    switch (activeTab) {
      case "applications":
        return <Applications />;
      case "games":
        return <Games />;
      default:
        return null;
    }
  };

  return (
    <div className={`w-full px-8 py-4 flex flex-col gap-1 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}>
      {/* Navbar for apps/games */}
      {!isFullScreen && (
        <div className={`flex items-center justify-between px-12 py-2 border-black ${darkMode ? "bg-gray-800" :"bg-blue-500"}`}>
          {/* Left: Tabs */}
          <div className="flex space-x-6 text-m font-medium">
            <button
              onClick={() => setActiveTab("applications")}
              className={activeTab === "applications" ? "text-blue-500" : ""}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("games")}
              className={activeTab === "games" ? "text-blue-500" : ""}
            >
              Games
            </button>
            <button
              
              onClick={() => navigate("/engine-visualization") }
            >
              Engine
            </button>
          </div>

          {/* Right: Search */}
          <div
            className={`flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded transition-all duration-200 border ${searchActive ? "border-blue-500" : "border-transparent"}`}
            style={{ width: "24rem" }} // fixed width, does not change on focus
          >
            <FaSearch size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm placeholder-gray-300 w-full"
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="h-full overflow-auto">{renderComponent()}</div>
    </div>
  );
};

export default BottomSection;
