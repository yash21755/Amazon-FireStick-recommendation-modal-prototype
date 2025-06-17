import React, { useState } from "react";
import PersonalDetails from "../components/PersonalDetails.jsx";
import Statistics from "../components/Statistics.jsx";
import Subscriptions from "../components/Subscriptions.jsx";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      {/* Dark Navbar with Tabs */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-gray-700 bg-gray-800">
        <div className="flex space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("personal")}
            className={`hover:text-blue-400 transition ${
              activeTab === "personal" ? "text-blue-500" : ""
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            className={`hover:text-blue-400 transition ${
              activeTab === "statistics" ? "text-blue-500" : ""
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`hover:text-blue-400 transition ${
              activeTab === "subscriptions" ? "text-blue-500" : ""
            }`}
          >
            Subscriptions
          </button>
          {/* Optional 4th Tab */}
          <button
            onClick={() => setActiveTab("activity")}
            className={`hover:text-blue-400 transition ${
              activeTab === "activity" ? "text-blue-500" : ""
            }`}
          >
            Activity Log
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "personal" && <PersonalDetails />}
        {activeTab === "statistics" && <Statistics />}
        {activeTab === "subscriptions" && <Subscriptions />}
        {activeTab === "activity" && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-semibold">Activity Log</h2>
            <p className="text-gray-400 mt-4">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
