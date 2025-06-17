import React from "react";

const Subscriptions = () => {
  const platforms = [
    { name: "Netflix", plan: "Premium", renewal: "2025-07-01" },
    { name: "Prime Video", plan: "Standard", renewal: "2025-06-20" },
    { name: "Disney+", plan: "Basic", renewal: "2025-08-12" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-white">
      <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
      <ul className="space-y-4">
        {platforms.map((p, idx) => (
          <li key={idx} className="p-4 border border-gray-700 rounded flex justify-between items-center">
            <div>
              <p className="font-bold text-white">{p.name}</p>
              <p className="text-gray-400 text-sm">Plan: {p.plan}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs">Renewal</p>
              <p className="text-gray-300">{p.renewal}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;
