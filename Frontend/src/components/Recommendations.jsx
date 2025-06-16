import React, { useEffect, useState } from "react";
import recommendationsData from "../data/recommendation_database.json";

const Recommendations = ({ searchQuery }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setRecommendations(recommendationsData);
  }, []);

  const filtered = recommendations.filter((rec) =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl text-gray-600 mb-6">*All recommendations stay in the section for a period of 1 week only</h2>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No matching recommendations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {filtered.map((rec) => (
            <div
              key={rec.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col items-center text-center"
            >
              <img
                src={rec.poster}
                alt={rec.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 w-full">
                <h3 className="font-semibold text-sm mb-1">{rec.title}</h3>
                <p className="text-xs text-gray-400 mb-1">
                  Recommended by: {rec.recommendedBy}
                </p>
                <p className="text-xs text-gray-400 mb-1">Length: {rec.length}</p>
                <p className="text-xs text-yellow-500 font-medium mb-2">
                  IMDb: {rec.imdb}
                </p>
                <a
                  href={rec.platformLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <button
                    className="w-20 h-10 bg-center bg-cover rounded"
                    style={{ backgroundImage: `url(${rec.platformLogo})` }}
                    title={`Watch on ${rec.platform}`}
                  ></button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
