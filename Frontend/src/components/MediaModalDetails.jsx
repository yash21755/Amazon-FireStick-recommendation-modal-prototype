import React from "react";
import { FaTimes } from "react-icons/fa";

const MediaModalDetails = ({ item, onClose }) => {
  if (!item) return null;

const isSeries = "Episodes" in item || "Type" in item;

  // Use full-quality image for modal
  const poster =
    (item.Poster_Link || item["Image-src"] || item.img)?.replace(/_V1_.*\.jpg$/, '_V1_.jpg');

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center px-4">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black text-white hover:text-red-500 text-xl z-10"
        >
          <FaTimes />
        </button>

        {/* Content */}
        <div className="p-6 md:w-3/5 space-y-3 overflow-y-auto max-h-[80vh]">
          <h2 className="text-3xl font-bold tracking-wide">{item.title}</h2>

          <p className="text-gray-300 text-sm">{item.description}</p>

          {isSeries ? (
            <div className="grid grid-cols-1 gap-2 text-sm mt-4">
              {item.Year && <p><strong>Year:</strong> {item.Year}</p>}
              {item.Episodes && <p><strong>Episodes:</strong> {item.Episodes}</p>}
              {item.Type && <p><strong>Type:</strong> {item.Type}</p>}
              {item.rating && <p><strong>Rating:</strong> ⭐ {item.rating}</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 text-sm mt-4">
              {item.Released_Year && <p><strong>Year:</strong> {item.Released_Year}</p>}
              {item.Certificate && <p><strong>Certificate:</strong> {item.Certificate}</p>}
              {item.Runtime && <p><strong>Runtime:</strong> {item.Runtime}</p>}
              {item.Genre && <p><strong>Genre:</strong> {item.Genre}</p>}
              {item.IMDB_Rating && <p><strong>IMDb:</strong> ⭐ {item.IMDB_Rating}</p>}
              {item.Meta_score && <p><strong>Meta Score:</strong> {item.Meta_score}</p>}
              {item.Director && <p><strong>Director:</strong> {item.Director}</p>}
              {(item.Star1 || item.Star2 || item.Star3 || item.Star4) && (
                <p>
                  <strong>Cast:</strong>{" "}
                  {[item.Star1, item.Star2, item.Star3, item.Star4]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          )}

          <button className="mt-6 bg-white hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg text-blue-950 font-semibold transition">
            Watch Now
          </button>
        </div>

        {/* Poster */}
        <div className="md:w-2/5 w-full flex items-center justify-center bg-black p-4">
          <img
            src={poster}
            alt={item.title}
            className="max-h-[500px] w-auto object-contain rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaModalDetails;
