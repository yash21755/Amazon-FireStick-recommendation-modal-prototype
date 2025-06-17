import React from "react";

const Statistics = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-white">
      <h2 className="text-xl font-semibold mb-4">Your Activity Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-gray-700 rounded">
          <p className="text-gray-400">Total Watch Time</p>
          <p className="text-2xl font-bold text-white">153 hrs</p>
        </div>
        <div className="p-4 border border-gray-700 rounded">
          <p className="text-gray-400">Movies Watched</p>
          <p className="text-2xl font-bold text-white">78</p>
        </div>
        <div className="p-4 border border-gray-700 rounded">
          <p className="text-gray-400">Series Watched</p>
          <p className="text-2xl font-bold text-white">45</p>
        </div>
        <div className="p-4 border border-gray-700 rounded">
          <p className="text-gray-400">Most Watched Genre</p>
          <p className="text-xl font-semibold text-white">Drama</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
