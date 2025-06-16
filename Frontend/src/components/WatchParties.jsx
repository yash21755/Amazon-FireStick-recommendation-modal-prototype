import React, { useEffect, useState } from "react";
import partiesData from "../data/watchParty_database.json";

const formatDateTime = (dateTimeStr) => {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateTimeStr).toLocaleString("en-US", options);
};

const WatchParties = ({ searchQuery }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(partiesData);
  }, []);

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">
          No matching watch party groups found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {filtered.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={group.image}
                alt={group.name}
                className="w-20 h-20 object-cover rounded-full mb-2"
              />
              <h3 className="font-semibold text-sm mb-1">{group.name}</h3>
              <p className="text-xs text-gray-400 mb-2">
                Next Watch Party: {formatDateTime(group.nextParty)}
              </p>
              <button className="bg-purple-500 text-white text-xs px-4 py-1 rounded hover:bg-purple-600">
                Group Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchParties;
