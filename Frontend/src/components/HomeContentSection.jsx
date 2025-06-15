import React, { useState } from "react";
import Applications from "./Applications";
import Games from "./Games";
import MyNetwork from "./MyNetwork";
import WatchAlong from "./WatchAlong";
import MemoryLane from "./MemoryLane";
import { FaSearch } from "react-icons/fa";

const BottomSection = () => {
  const [activeTab, setActiveTab] = useState("applications");

  const isFullScreen =
    activeTab === "myNetwork" || activeTab === "watchAlong" || activeTab === "memoryLane";

  const renderComponent = () => {
    switch (activeTab) {
      case "applications":
        return <Applications />;
      case "games":
        return <Games />;
      case "myNetwork":
        return <MyNetwork />;
      case "watchAlong":
        return <WatchAlong />;
      case "memoryLane":
        return <MemoryLane />;
      default:
        return null;
    }
  };

  return (
    <div className={`${isFullScreen ? "h-screen" : "h-[55vh]"} bg-gray-900 text-white transition-all duration-500`}>
      {/* Navbar (only visible for apps/games) */}
      {!isFullScreen && (
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700 bg-gray-800">
          {/* Left: Tabs */}
          <div className="flex space-x-6 text-sm font-medium">
            <button onClick={() => setActiveTab("applications")}>Applications</button>
            <button onClick={() => setActiveTab("games")}>Games</button>
            <button onClick={() => setActiveTab("myNetwork")}>My Network</button>
            <button onClick={() => setActiveTab("watchAlong")}>Watch Along</button>
            <button onClick={() => setActiveTab("memoryLane")}>Memory Lane</button>
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
