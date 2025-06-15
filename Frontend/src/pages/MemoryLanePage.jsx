import React from "react";
const MemoryLanePage = ({ darkMode }) => (
  <div className={`w-full h-full flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
    <h1 className="text-4xl font-bold">Memory Lane Page</h1>
  </div>
);
export default MemoryLanePage;
