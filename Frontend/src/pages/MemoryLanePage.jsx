import React, { useState, useEffect } from "react";
import memoryData from "../data/memoryLane_database.json";

// Correct logo mapping for all platforms
const platformLogos = {
  netflix: "/logos/netflix.png",
  "prime video": "/logos/prime.webp",
  prime: "/logos/prime.webp",
  "disney+": "/logos/disney.jpg",
  disney: "/logos/disney.jpg",
  hulu: "/logos/hulu.svg"
};

const MemoryLanePage = ({ darkMode }) => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const sorted = [...memoryData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setMemories(sorted);
  }, []);

  const removeMemory = (id) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className={`w-full h-full p-6 overflow-y-auto ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl text font-bold mb-6">Memory Lane</h1>

      {memories.map((item) => (
        <div key={item.id} className="flex rounded-lg shadow-md mb-6 bg-white dark:bg-gray-800 overflow-hidden">
          
          {/* Left: Poster */}
          <img
            src={item.poster}
            alt={item.title}
            className="w-56 h-60 object-fill"
          />

          {/* Center: Details */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Watched on <strong>{new Date(item.date).toLocaleDateString()}</strong> with <strong>{item.people.length}</strong> {item.people.length === 1 ? "person" : "people"}.
              </p>

              {/* Duration and Rating */}
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Duration: {item.duration} mins | IMDb Rating: ⭐ {item.rating}
              </p>

              {/* Round profile pics */}
              <div className="mt-3 flex items-center space-x-2 flex-wrap">
                {item.people.slice(0, 8).map((user, idx) => (
                  <img
                    key={idx}
                    src={user.avatar}
                    title={user.name}
                    className="w-8 h-8 rounded-full border border-white object-cover"
                  />
                ))}
                {item.people.length > 8 && (
                  <span className="text-xs text-gray-400">
                    +{item.people.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Relive buttons */}
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm mr-2">Want to relive it?</span>
              {item.platforms.slice(0, 2).map((platform, idx) => {
                // Normalize platform name for logo lookup
                const key = platform.name.toLowerCase().replace(/\s+/g, "");
                // Try exact match, then fallback to original
                const logo =
                  platformLogos[platform.name.toLowerCase()] ||
                  platformLogos[key] ||
                  "";
                return (
                  <a
                    key={idx}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-15 h-7 rounded overflow-hidden bg-white hover:scale-105 transition"
                    title={`Watch on ${platform.name}`}
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={platform.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Delete */}
          <div className="flex items-center px-4">
            <button
              onClick={() => removeMemory(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoryLanePage;
