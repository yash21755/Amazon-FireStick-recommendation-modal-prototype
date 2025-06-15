import React, { useState } from "react";
import Applications from "./Applications";
import Games from "./Games";
import { FaSearch, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomSection = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("applications");
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
    <div className={`w-full p-8 flex flex-col gap-4 transition-colors duration-300 ${darkMode ? "bg-[#23272f] text-white" : "bg-gray-200 text-gray-900"}`}>
      {/* Navbar (only visible for apps/games) */}
      {!isFullScreen && (
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700 bg-gray-800">
          {/* Left: Tabs */}
          <div className="flex space-x-6 text-sm font-medium">
            <button onClick={() => setActiveTab("applications")}>Applications</button>
            <button onClick={() => setActiveTab("games")}>Games</button>
          </div>

          {/* Right: Search */}
          <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded">
            <FaSearch size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm placeholder-gray-300"
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
