import VoiceLine from "./ui/VoiceLine";
import ConnectorDash from "./ui/ConnectorDash";
import InvertConnectorDash from "./ui/InvertConnectorDash";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import movieCSVfile from "../data/movie_database.csv?url";
import axios from "axios";

const Diagram = () => {
  const [movies, setMovies] = useState([]);
  const [exploreRecommendations, setExploreRecommendations] = useState([]);
  const [emotionContext, setEmotionContext] = useState({});
  const [sleepTime, setSleepTime] = useState("N/A");
  const [summary, setSummary] = useState({
    mostFrequentGenre: "N/A",
    avgRuntime: "N/A",
    avgIMDB: "N/A",
    avgVotes: "N/A",
  });

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
      },
    });
  }, []);

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
              score: matched?.score ?? null,
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
                    score: matched?.score ?? null,
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
                  score: matched?.score ?? null,
                };
              });

            setExploreRecommendations(happyFormatted);
          })
          .catch(() => setExploreRecommendations([]));
      });
  }, [movies]);
  useEffect(() => {
    // Fetch sleep time
    const storedSleep = localStorage.getItem("sleepTime");
    if (storedSleep) {
      setSleepTime(storedSleep);
    }

    if (exploreRecommendations.length === 0) {
      setSummary({
        mostFrequentGenre: "N/A",
        avgRuntime: "N/A",
        avgIMDB: "N/A",
        avgVotes: "N/A",
      });
      return;
    }

    // Most frequent genre
    const genreCount = {};
    let totalRuntime = 0;
    let totalRating = 0;
    let totalVotes = 0;
    let validRuntime = 0;
    let validRating = 0;
    let validVotes = 0;

    exploreRecommendations.forEach((movie) => {
      // genre split by comma
      const genres = movie.Genre?.split(",") || [];
      genres.forEach((g) => {
        const genre = g.trim();
        if (genre) genreCount[genre] = (genreCount[genre] || 0) + 1;
      });

      // runtime
      const rt = parseInt(movie.Runtime?.replace(" min", "") || "0");
      if (!isNaN(rt) && rt > 0) {
        totalRuntime += rt;
        validRuntime++;
      }

      // rating
      const r = parseFloat(movie.rating);
      if (!isNaN(r)) {
        totalRating += r;
        validRating++;
      }

      // votes
      const votes = parseInt(movie.no_of_votes || "0");
      if (!isNaN(votes)) {
        totalVotes += votes;
        validVotes++;
      }
    });

    const mostFrequentGenre = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    setSummary({
      mostFrequentGenre,
      avgRuntime: validRuntime ? Math.round(totalRuntime / validRuntime) + " min" : "N/A",
      avgIMDB: validRating ? (totalRating / validRating).toFixed(2) : "N/A",
      avgVotes: validVotes ? Math.round(totalVotes / validVotes).toLocaleString() : "N/A",
    });
  }, [exploreRecommendations]);

  return (
    <div className="relative w-full mx-auto px-6 py-20 flex justify-between ">
      {/* Floating connector */}
      <div className=" absolute top-[4vh] left-[-4vw] z-20 pointer-events-none">
        <ConnectorDash />
      </div>
      <div className=" absolute bottom-[7vh] right-[14vw] z-20 pointer-events-none">
        <InvertConnectorDash />
      </div>

      {/* Content layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative h-[30vh] mt-[11vh] mr-10 ml-[-15vw]">
        {/* Tone Detector */}
        <div className="bg-blue-950/80 cursor-pointer border border-purple-500 text-purple-400 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Tone Detector</h2>
          <div className="mt-5">
            <h4>Voice</h4>
            <VoiceLine />
          </div>
        </div>

        {/* Emotion Detector */}
        <div className="bg-blue-950/80 cursor-pointer border border-pink-500 rounded-2xl shadow-lg p-6 text-pink-400 text-center">
          <h2 className="text-xl font-semibold">Emotion Detector</h2>
          <div className="flex flex-col items-left mt-3 text-left">
            <h4>
              Emotion : <span className="text-white">{emotionContext.emotion || "N/A"}</span>
            </h4>
            <h4>
              Weather : <span className="text-white">{emotionContext.weather || "N/A"}</span>
            </h4>
            <h4>
              Time of Day : <span className="text-white">{emotionContext.time_of_day || "N/A"}</span>
            </h4>
            <h4>
              Temperature : <span className="text-white">{emotionContext.temperature || "N/A"}</span>
            </h4>
            <h4>
              Past Behaviour
            </h4>
          </div>
        </div>

        {/* Recommendation Modal */}
        <div className="bg-blue-950/80 cursor-pointer border border-blue-500 rounded-2xl shadow-lg p-6 text-blue-400 text-center">
          <h2 className="text-xl font-semibold">Recommendation Modal</h2>
          <div className="flex flex-col items-left mt-3 text-left">
            <h4>
              Emotion Detected : <span className="text-white">{emotionContext.emotion || "N/A"}</span>
            </h4>
            <h4>
              Sleep Time : <span className="text-white">{sleepTime}</span>
            </h4>
            <h4>
              Time of Day : <span className="text-white">{emotionContext.time_of_day || "N/A"}</span>
            </h4>
            <h4>
              Genre of Element : <span className="text-white">{summary.mostFrequentGenre}</span>
            </h4>
            <h4>
              Playtime of Element : <span className="text-white">{summary.avgRuntime}</span>
            </h4>
            <h4>
              IMDB Rating of Element : <span className="text-white">{summary.avgIMDB}</span>
            </h4>
            <h4>
              Trend of Element : <span className="text-white">{summary.avgVotes} votes</span>
            </h4>
          </div>
        </div>

      </div>

      {/* Final entries - right green column */}
      <div className="w-[25vw] h-[60vh] mr-[-25vw] border-l-2 border-green-400 z-10">
        <div className="mt- space-y-2 px-4">
          {exploreRecommendations.map((item, idx) => (
            <div key={item.id || idx} className="text-green-500 font-semibold">
              {item.title}
              {typeof item.score === "number" && (
                <span className="ml-2 font-mono text-green-300">
                  ({item.score.toFixed(2)})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diagram;
