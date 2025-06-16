import React, { useEffect, useState } from "react";
import requestsData from "../data/requests_database.json";

const Requests = ({ searchQuery }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(requestsData);
  }, []);

  const filtered = requests.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No matching requests found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={req.avatar}
                alt={req.name}
                className="w-20 h-20 rounded-full mb-2 object-cover"
              />
              <h3 className="font-medium text-sm mb-1">{req.name}</h3>
              <p className="text-xs text-gray-400 mb-2">
                {req.mutualFriends} mutual friend
                {req.mutualFriends !== 1 ? "s" : ""}
              </p>
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">
                Accept Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
