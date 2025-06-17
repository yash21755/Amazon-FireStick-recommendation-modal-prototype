import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const topPlatformData = [
  { platform: "Netflix", hours: 48 },
  { platform: "Prime", hours: 37 },
  { platform: "Disney+", hours: 28 },
  { platform: "YouTube", hours: 20 },
  { platform: "Hulu", hours: 15 },
];

const monthlyStats6 = [
  { month: "Jan", movies: 10, episodes: 20, watchParties: 5, games: 2, liveEvents: 3 },
  { month: "Feb", movies: 7, episodes: 18, watchParties: 4, games: 3, liveEvents: 2 },
  { month: "Mar", movies: 13, episodes: 25, watchParties: 6, games: 4, liveEvents: 5 },
  { month: "Apr", movies: 11, episodes: 19, watchParties: 3, games: 5, liveEvents: 4 },
  { month: "May", movies: 9, episodes: 23, watchParties: 5, games: 3, liveEvents: 4 },
  { month: "Jun", movies: 8, episodes: 21, watchParties: 4, games: 6, liveEvents: 3 },
];

const monthlyStats12 = [...monthlyStats6,
  { month: "Jul", movies: 6, episodes: 18, watchParties: 2, games: 4, liveEvents: 2 },
  { month: "Aug", movies: 9, episodes: 20, watchParties: 3, games: 3, liveEvents: 4 },
  { month: "Sep", movies: 7, episodes: 15, watchParties: 4, games: 2, liveEvents: 3 },
  { month: "Oct", movies: 10, episodes: 22, watchParties: 5, games: 4, liveEvents: 5 },
  { month: "Nov", movies: 12, episodes: 26, watchParties: 6, games: 5, liveEvents: 4 },
  { month: "Dec", movies: 14, episodes: 28, watchParties: 7, games: 6, liveEvents: 6 },
];

const StatisticsPage = () => {
  const [showFullYear, setShowFullYear] = useState(false);

  const data = showFullYear ? monthlyStats12 : monthlyStats6;

  return (
    <div className="bg-gray-900 min-h-screen  text-white font-sans mt-[-15px] mr-[-15px] ml-[-15px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 pb-[-5px]">
        {/* Section 1 - Basic Stats */}
        <div className="bg-gray-800 p-2 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Activity Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-700 rounded">
              <p className="text-gray-400">Total Watch Time</p>
              <p className="text-2xl font-bold text-white">153 hrs</p>
            </div>
            <div className="p-4 border border-gray-700 rounded">
              <p className="text-gray-400">Movies Watched</p>
              <p className="text-2xl font-bold text-white">78</p>
            </div>
            <div className="p-4 border border-gray-700 rounded">
              <p className="text-gray-400">episodes Watched</p>
              <p className="text-2xl font-bold text-white">45</p>
            </div>
            <div className="p-4 border border-gray-700 rounded">
              <p className="text-gray-400">Most Watched Genre</p>
              <p className="text-xl font-semibold text-white">Drama</p>
            </div>
          </div>
        </div>

        {/* Section 2 - Bar Chart */}
        <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2 mt-[-5px]">Top Platforms by Watch Time</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topPlatformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="platform" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="hours" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 3 - Line Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Monthly Engagement Overview</h2>
          <button
            onClick={() => setShowFullYear(!showFullYear)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded text-sm"
          >
            Last {showFullYear ? "6" : "12"} Months
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="movies" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="episodes" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="watchParties" stroke="#F59E0B" strokeWidth={2} />
            <Line type="monotone" dataKey="games" stroke="#8B5CF6" strokeWidth={2} />
            <Line type="monotone" dataKey="liveEvents" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsPage;
