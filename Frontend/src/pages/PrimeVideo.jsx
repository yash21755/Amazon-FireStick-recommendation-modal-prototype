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
  const [similarRecommendations, setSimilarRecommendations] = useState([]);
  const [referenceTitle, setReferenceTitle] = useState("");
  const [trends,setTrends]=useState([]);
  useEffect(() => {
    // Parse movies
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
        const uniqueMovies = mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        setMovies(uniqueMovies);
      },
    });

//----------------------------------------------------------------------------------------------

    // Parse series
    Papa.parse(serieCSVfile, {
      download: true,
      header: true,
      complete: (results) => {
        const raw = results.data;
        const mapped = raw
          .filter(
            (row) =>
              row["Image-src"]?.startsWith("http") && row.Name && row.Year
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
        const uniqueSeries = mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        setSeries(uniqueSeries);
      },
    });

//----------------------------------------------------------------------------------------------------------------------

    // Fetch becuse you watched recommendations
    axios.get("http://localhost:5001/api/similiar")
      .then((res) => {
        const { reference, similar } = res.data;
        setReferenceTitle(reference);

        // Extract titles to match
        const similarTitles = similar.map((item) =>
          item.title?.trim().toLowerCase()
        );

        // Format matching movies using the same formatting logic
        const formattedSimilar = movies
          .filter((row) =>
            similarTitles.includes(row.title.trim().toLowerCase())
          )
          .map((row, idx) => ({
            id: `${row.title}-${row.Released_Year || idx}`,
            title: row.title,
            img: row.img,
            Poster_Link: row.Poster_Link,
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
            description: row.description,
          }));

        setSimilarRecommendations(formattedSimilar);
      })
      .catch((err) => {
        console.error("Failed to fetch trending recommendations:", err);
      });
    // }, [movies]);


//-------------------------------------------------------------------------------------------------------



    // Optionally comment out this explore fetch
    // useEffect(() => {
    // useEffect(() => {
    const fetchRecommendations = async () => {
      const cached = localStorage.getItem("explore_recommendations");
      const cachedTime = localStorage.getItem("explore_recommendations_time");

      const now = Date.now();
      const fifteenMinutes = 15 * 60 * 1000;

      if (cached && cachedTime && now - parseInt(cachedTime) < fifteenMinutes) {
        setExploreRecommendations(JSON.parse(cached));
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/recommend/test");
        const data = res.data;

        if (!Array.isArray(data)) {
          console.error("Backend response is not an array:", data);
          return;
        }

        const allTitles = new Set(
          [...movies, ...series]
            .map((item) => item.title?.trim().toLowerCase())
            .filter(Boolean)
        );

        const recs = data
          .filter((item) => {
            const title = (item.series_title || item.name || "").trim().toLowerCase();
            return allTitles.has(title);
          })
          .map((item, idx) => {
            const posterLink = item.poster_link || item["image-src"] || "";
            const cleanPoster = posterLink
              ? posterLink.replace(/_V1_.*\.jpg$/, "_V1_.jpg")
              : "/images/alt_poster.png";

            return {
              ...item,
              id: `${item.series_title || item.name || "rec"}-${idx}`,
              title: item.series_title || item.name || "Untitled",
              img: cleanPoster,
              Poster_Link: posterLink,
              Released_Year: item.released_year || item.year || "Unknown",
              Certificate: item.certificate || "N/A",
              Runtime: item.runtime || "N/A",
              Genre: item.genre || "N/A",
              IMDB_Rating: item.imdb_rating || item.rating || "N/A",
              Meta_score: item.meta_score || "N/A",
              Director: item.director || "Unknown",
              Star1: item.star1 || "",
              Star2: item.star2 || "",
              Star3: item.star3 || "",
              Star4: item.star4 || "",
              description: item.description || item.overview || "No description available.",
            };
          });

        setExploreRecommendations(recs);
        localStorage.setItem("explore_recommendations", JSON.stringify(recs));
        localStorage.setItem("explore_recommendations_time", Date.now().toString());
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      }
    };


    fetchRecommendations();
  }, []);



  const handleItemClick = (item) => setSelectedItem(item);
  const handleWatchNow = (item) =>
    setWatchCounts((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-5 pb-10">
        <AdBanner />
        <RowSection
          title="Trending Now"
          items={trends}
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
          title={`Because You Watched "${referenceTitle}"`}
          items={similarRecommendations}
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
