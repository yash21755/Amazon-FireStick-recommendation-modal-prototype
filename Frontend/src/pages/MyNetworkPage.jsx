import React, { useState } from "react";
import MyFriends from "../components/MyFriends";
import Recommendations from "../components/Recommendations";
import Requests from "../components/Requests";
import WatchParties from "../components/WatchParties";
import { FaSearch } from "react-icons/fa";

const MyNetworkPage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const tabMap = {
    friends: <MyFriends searchQuery={searchQuery} />,
    recommendations: <Recommendations searchQuery={searchQuery} />,
    requests: <Requests searchQuery={searchQuery} />,
    watchparties: <WatchParties searchQuery={searchQuery} />,
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-3 border-b border-gray-700 bg-gray-800">
        {/* Left: Tabs */}
        <div className="flex space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("friends")}
            className={`hover:text-blue-400 transition ${
              activeTab === "friends" ? "text-blue-500" : ""
            }`}
          >
            My Friends
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`hover:text-blue-400 transition ${
              activeTab === "recommendations" ? "text-blue-500" : ""
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`hover:text-blue-400 transition ${
              activeTab === "requests" ? "text-blue-500" : ""
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setActiveTab("watchparties")}
            className={`hover:text-blue-400 transition ${
              activeTab === "watchparties" ? "text-blue-500" : ""
            }`}
          >
            Watch Party Groups
          </button>
        </div>

        {/* Right: Search */}
        <div
          className={`flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded transition-all duration-200 border ${
            searchActive ? "border-blue-500" : "border-transparent"
          }`}
          style={{ width: "24rem" }}
        >
          <FaSearch size={14} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
            className="bg-transparent outline-none text-sm placeholder-gray-300 w-full"
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">{tabMap[activeTab]}</div>
    </div>
  );
};

export default MyNetworkPage;
