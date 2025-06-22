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
  const [trendingRecommendations, setTrendingRecommendations] = useState([]);

  // Load movie CSV
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
            rating: parseFloat(row.IMDB_Rating),
            Meta_score: row.Meta_score,
            Director: row.Director,
            Star1: row.Star1,
            Star2: row.Star2,
            Star3: row.Star3,
            Star4: row.Star4,
            description: row.Overview,
            no_of_votes: parseInt(row.No_of_Votes?.replace(/,/g, "") || "0"),

          }));

        const seen = new Set();
        const uniqueMovies = mapped.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        setMovies(uniqueMovies);
        const trending = [...uniqueMovies]
          .filter((m) => !isNaN(m.no_of_votes))
          .sort((a, b) => b.no_of_votes - a.no_of_votes)
          .slice(0, 10);

        setTrendingRecommendations(trending);
      },
    });
  }, []);

  // Load series CSV
  useEffect(() => {
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
  }, []);

  // Fetch similar recommendations after movies load
  useEffect(() => {
    if (movies.length === 0) return;

    axios.get("http://localhost:5001/api/similiar")
      .then((res) => {
        const { reference, similar } = res.data;
        setReferenceTitle(reference);
        console.log("Because you watched",similar);
        const similarTitles = similar?.map((item) =>
          item.title?.trim().toLowerCase()
        ) || [];

        const formattedSimilar = movies
          .filter((row) =>
            similarTitles.includes(row.title.trim().toLowerCase())
          )
          .map((row, idx) => ({
            id: `${row.title}-${row.Released_Year || idx}`,
            ...row,
          }));

        // Fallback: if no recommendations, try with happy mood
        if (!formattedSimilar.length) {
          axios.post("http://localhost:5000/api/recommend", { emotion: "happy" })
            .then((happyRes) => {
              const happyRecom = happyRes.data;
              const happyTitles = happyRecom?.map((item) =>
                item.title?.trim().toLowerCase()
              ) || [];
              const happyFormatted = movies
                .filter((row) =>
                  happyTitles.includes(row.title.trim().toLowerCase())
                )
                .map((row, idx) => ({
                  id: `${row.title}-${row.Released_Year || idx}`,
                  ...row,
                }));
              setSimilarRecommendations(happyFormatted);
            })
            .catch(() => setSimilarRecommendations([]));
        } else {
          setSimilarRecommendations(formattedSimilar);
        }
      })
      .catch(() => {
        // fallback: try happy mood
        axios.post("http://localhost:5000/api/recommend", { emotion: "happy" })
          .then((happyRes) => {
            const happyRecom = happyRes.data;
            const happyTitles = happyRecom?.map((item) =>
              item.title?.trim().toLowerCase()
            ) || [];
            const happyFormatted = movies
              .filter((row) =>
                happyTitles.includes(row.title.trim().toLowerCase())
              )
              .map((row, idx) => ({
                id: `${row.title}-${row.Released_Year || idx}`,
                ...row,
              }));
            setSimilarRecommendations(happyFormatted);
          })
          .catch(() => setSimilarRecommendations([]));
      });
  }, [movies]);

  // Fetch Recommendations
  useEffect(() => {
    if (movies.length === 0) return;

    axios
      .get("http://localhost:5000/api/recommend/test")
      .then((res) => {
        const data = res.data;
        const Recom = data?.recommendations || data?.Recom || [];

        // Capture context fields
        setEmotionContext({
          emotion: data.emotion,
          time_of_day: data.time_of_day,
          weather: data.weather,
          temperature: data.temperature,
        });

        const similarTitles = Recom.map((item) =>
          item.title?.trim().toLowerCase()
        );

        const formattedRecom = movies
          .filter((row) =>
            similarTitles.includes(row.title.trim().toLowerCase())
          )
          .map((row, idx) => {
            const matched = Recom.find(
              (r) => r.title?.trim().toLowerCase() === row.title.trim().toLowerCase()
            );
            return {
              id: `${row.title}-${row.Released_Year || idx}`,
              ...row,
              // score: matched?.score ?? null,
            };
          });

        // Fallback to happy mood if empty
        if (!formattedRecom.length) {
          axios
            .post("http://localhost:5000/api/recommend", { emotion: "happy" })
            .then((happyRes) => {
              const happyRecom = happyRes.data.recommendations || [];
              const happyTitles = happyRecom.map((item) =>
                item.title?.trim().toLowerCase()
              );

              const happyFormatted = movies
                .filter((row) =>
                  happyTitles.includes(row.title.trim().toLowerCase())
                )
                .map((row, idx) => {
                  const matched = happyRecom.find(
                    (r) =>
                      r.title?.trim().toLowerCase() ===
                      row.title.trim().toLowerCase()
                  );
                  return {
                    id: `${row.title}-${row.Released_Year || idx}`,
                    ...row,
                    // score: matched?.score ?? null,
                  };
                });

              setExploreRecommendations(happyFormatted);
            })
            .catch(() => setExploreRecommendations([]));
        } else {
          setExploreRecommendations(formattedRecom);
        }
      })
      .catch(() => {
        // fallback to happy mood
        axios
          .post("http://localhost:5000/api/recommend", { emotion: "happy" })
          .then((happyRes) => {
            const happyRecom = happyRes.data.recommendations || [];
            const happyTitles = happyRecom.map((item) =>
              item.title?.trim().toLowerCase()
            );

            const happyFormatted = movies
              .filter((row) =>
                happyTitles.includes(row.title.trim().toLowerCase())
              )
              .map((row, idx) => {
                const matched = happyRecom.find(
                  (r) =>
                    r.title?.trim().toLowerCase() ===
                    row.title.trim().toLowerCase()
                );
                return {
                  id: `${row.title}-${row.Released_Year || idx}`,
                  ...row,
                  // score: matched?.score ?? null,
                };
              });

            setExploreRecommendations(happyFormatted);
          })
          .catch(() => setExploreRecommendations([]));
      });
  }, [movies]);

  const handleItemClick = (item) => setSelectedItem(item);
  const handleWatchNow = (item) =>
    setWatchCounts((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col gap-5 pb-10">
        <AdBanner />
        <RowSection
          title="Trending"
          items={trendingRecommendations}
          onItemClick={handleItemClick}
        />
        <RowSection
          title="Explore"
          items={exploreRecommendations}
          onItemClick={handleItemClick}
        />
        <RowSection
          title={`Because You Watched "${referenceTitle}"`}
          items={similarRecommendations}
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
