import React, { useEffect, useState } from "react";
import friendsData from "../data/friends_database.json";

const MyFriends = ({ searchQuery }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends(friendsData);
  }, []);

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No friends match your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {filtered.map((friend) => (
            <div
              key={friend.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-20 h-20 rounded-full mb-2 object-cover"
              />
              <h3 className="font-medium text-sm mb-2">{friend.name}</h3>
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded mb-1 hover:bg-blue-600">
                Chat
              </button>
              <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700">
                Send Recommendation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFriends;
