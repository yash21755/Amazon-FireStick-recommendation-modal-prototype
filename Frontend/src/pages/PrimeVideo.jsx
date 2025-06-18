import React, { useEffect, useState } from "react";
import AdBanner from "../components/AdBanner";
import RowSection from "../components/RowSection";
import Papa from "papaparse";
import csvFile from "../data/imdb_database.csv?url"; // Vite handles ?url import
import Navbar from "../components/PrimeNavBar.jsx";

const PrimeVideo = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Papa.parse(csvFile, {
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
    img: row.Poster_Link.trim().replace(/_V1_.*\.jpg$/, "_V1_.jpg"), // <-- HERE
    rating: parseFloat(row.IMDB_Rating),
  }));

        // Optional: remove duplicates
        const seen = new Set();
        const uniqueMovies = mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });

        setMovies(uniqueMovies);
      },
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-5 pb-10">
        <AdBanner />
        <RowSection title="Trending Now" items={movies.slice(0, 10)} />
        <RowSection title="New Releases" items={movies.slice(10, 20)} />
        <RowSection title="Because You Watched 'The Boys'" items={movies.slice(20, 30)} />
        <RowSection title="Top IMDb Rated" items={[...movies].sort((a, b) => b.rating - a.rating).slice(0, 10)} />
      </div>
    </>
  );
};

export default PrimeVideo;
