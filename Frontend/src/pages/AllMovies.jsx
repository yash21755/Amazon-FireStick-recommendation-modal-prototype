import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import movieCSVfile from "../data/movie_database.csv?url";
import Navbar from "../components/PrimeNavBar.jsx";
import MediaModalDetails from "../components/MediaModalDetails.jsx";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Papa.parse(movieCSVfile, {
      download: true,
      header: true,
      complete: (results) => {
        const raw = results.data;
        const mapped = raw
          .filter(
            (row) =>
              row.Poster_Link?.startsWith("http") &&
              row.Series_Title &&
              row.Released_Year
          )
          .map((row, idx) => ({
            id: `${row.Series_Title.trim()}-${row.Released_Year.trim() || idx}`,
            title: row.Series_Title.trim(),
            img: row.Poster_Link.trim().replace(/_V1_.*\.jpg$/, "_V1_.jpg"),
            Poster_Link: row.Poster_Link.trim(),
            Released_Year: row.Released_Year,
            Certificate: row.Certificate,
            Runtime: row.Runtime,
            Genre: row.Genre,
            IMDB_Rating: row.IMDB_Rating,
            Meta_score: row.Meta_score,
            Director: row.Director,
            Star1: row.Star1,
            Star2: row.Star2,
            Star3: row.Star3,
            Star4: row.Star4,
            description: row.Overview
          }))
        // Remove duplicates
        const seen = new Set();
        const uniqueMovies = mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        setMovies(uniqueMovies.slice(0, 100));
      },
    });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={setSearch} />
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-5 pb-10 pt-24 px-12">
        <h2 className="text-3xl font-bold mb-6">All Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filtered.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleItemClick(movie)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 cursor-pointer"
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-3">
                <div className="font-semibold text-lg truncate">{movie.title}</div>
                <div className="text-yellow-400 text-sm">
                  {movie.rating ? `${movie.rating} IMDb` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <MediaModalDetails item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default AllMovies;
