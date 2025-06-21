import React, { useEffect, useState } from "react";
import AdBanner from "../components/AdBanner";
import RowSection from "../components/RowSection";
import Papa from "papaparse";
import movieCSVfile from "../data/movie_database.csv?url";
import serieCSVfile from "../data/series_database.csv?url";
import Navbar from "../components/PrimeNavBar.jsx";
import MediaModalDetails from "../components/MediaModalDetails.jsx";
import axios from "axios";

const PrimeVideo = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [watchCounts, setWatchCounts] = useState({});
  const [exploreRecommendations, setExploreRecommendations] = useState([]);

  useEffect(() => {
    // 1. Fetch movies
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
            // Poster_Link: row.Poster_Link.trim(),
            Released_Year: row.Released_Year,
            Certificate: row.Certificate,
            Runtime: row.Runtime,
            Genre: row.Genre,
            IMDB_Rating: row.IMDB_Rating,
            rating: parseFloat(row.IMDB_Rating),
            Meta_score: row.Meta_score,
            Director: row.Director,
            Star1: row.Star1,
            Star2: row.Star2,
            Star3: row.Star3,
            Star4: row.Star4,
            description: row.Overview,
          }));

        const seen = new Set();
        setMovies(mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        }));
      },
    });

    // 2. Fetch series
    Papa.parse(serieCSVfile, {
      download: true,
      header: true,
      complete: (results) => {
        const raw = results.data;
        const mapped = raw
          .filter(
            (row) =>
              row["Image-src"]?.startsWith("http") &&
              row.Name &&
              row.Year
          )
          .map((row, idx) => {
            const title = row.Name.replace(/^\d+\.\s*/, "").trim();
            return {
              id: `${title}-${row.Year.trim() || idx}`,
              title,
              img: row["Image-src"].trim().replace(/_V1_.*\.jpg$/, "_V1_.jpg"),
              ["Image-src"]: row["Image-src"],
              rating: parseFloat(row.Rating),
              Year: row.Year,
              Episodes: row.Episodes,
              Type: row.Type,
              description: row.Description,
            };
          });

        const seen = new Set();
        setSeries(mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        }));
      },
    });

    // 3. Fetch recommendations 
   axios
     .get("http://localhost:5000/api/recommend/test")
     .then((res) => {
       const data = res.data;
       if (!Array.isArray(data)) {
         console.error("Backend response is not an array:", data);
         return;
       }
       // Spread in *all* fields so your modal sees Runtime, Certificate, Stars, description, etc.
       const recs = data.map((item, idx) => ({
           id: `${row.Series_Title.trim()}-${row.Released_Year.trim() || idx}`,
            title: row.Series_Title.trim(),
            img: row.Poster_Link.trim().replace(/_V1_.*\.jpg$/, "_V1_.jpg"),
            // Poster_Link: row.Poster_Link.trim(),
            Released_Year: row.Released_Year,
            Certificate: row.Certificate,
            Runtime: row.Runtime,
            Genre: row.Genre,
            IMDB_Rating: row.IMDB_Rating,
            rating: parseFloat(row.IMDB_Rating),
            Meta_score: row.Meta_score,
            Director: row.Director,
            Star1: row.Star1,
            Star2: row.Star2,
            Star3: row.Star3,
            Star4: row.Star4,
            description: row.Overview,
       }));
       setExploreRecommendations(recs);
     })
     .catch((err) => {
       console.error("Failed to fetch recommendations:", err);
     });
    })

  const handleItemClick = (item) => setSelectedItem(item);
  const handleWatchNow = (item) =>
    setWatchCounts((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));

  const trendingMovies = [...movies]
    .sort((a, b) => (watchCounts[b.id] || 0) - (watchCounts[a.id] || 0))
    .slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-5 pb-10">
        <AdBanner />
        <RowSection
          title="Trending Now"
          items={trendingMovies}
          onItemClick={handleItemClick}
          watchCounts={watchCounts}
        />
        <RowSection
          title="Explore"
          items={exploreRecommendations}
          onItemClick={handleItemClick}
        />
        <RowSection
          title="New Releases"
          items={[...movies, ...series]
            .map((item) => ({
              ...item,
              Parsed_Year: parseInt(item.Released_Year || item.Year?.slice(-4)),
            }))
            .sort((a, b) => b.Parsed_Year - a.Parsed_Year)
            .slice(0, 10)}
          onItemClick={handleItemClick}
        />
        <RowSection
          title="Because You Watched 'The Boys'"
          items={series.slice(0, 10)}
          onItemClick={handleItemClick}
        />
        <RowSection
          title="Top IMDb Rated"
          items={[...movies, ...series]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10)}
          onItemClick={handleItemClick}
        />
        <RowSection
          title="Popular Series"
          items={series.slice(10, 20)}
          onItemClick={handleItemClick}
        />
        <RowSection
          title="Classic TV"
          items={series
            .map((item) => ({
              ...item,
              Parsed_Year: parseInt(item.Year?.slice(-4)),
            }))
            .sort((a, b) => a.Parsed_Year - b.Parsed_Year)
            .slice(0, 10)}
          onItemClick={handleItemClick}
        />
      </div>

      {selectedItem && (
        <MediaModalDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          watchCount={watchCounts[selectedItem.id] || 0}
          onWatchNow={() => handleWatchNow(selectedItem)}
        />
      )}
    </>
  );
};

export default PrimeVideo;
