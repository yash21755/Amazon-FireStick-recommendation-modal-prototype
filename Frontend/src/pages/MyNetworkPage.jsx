import React, { useState } from "react";
import MyFriends from "../components/MyFriends";
import Recommendations from "../components/Recommendations";
import Requests from "../components/Requests";
import WatchParties from "../components/WatchParties";

// --- Main Page ---
const MyNetworkPage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("friends");
  const isFullScreen = false; // Toggle based on full view logic

  const tabMap = {
    friends: <MyFriends />,
    recommendations: <Recommendations />,
    requests: <Requests />,
    watchparties: <WatchParties />,
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {!isFullScreen && (
        <div className="flex items-center justify-between px-8 py-3 border-b border-gray-700 bg-gray-800">
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
        </div>
      )}

      <div className="flex-grow">{tabMap[activeTab]}</div>
    </div>
  );
};

export default MyNetworkPage;
