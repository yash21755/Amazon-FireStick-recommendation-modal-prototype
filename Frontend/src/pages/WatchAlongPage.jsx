import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const dummyUpcoming = [
  {
    id: 1,
    title: "The Mandalorian",
    date: "2025-06-18T19:00:00",
    poster: "/images/mandalorian.jpg",
    duration: 45,
    invited: [
      { name: "Alice", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
      { name: "Bob", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
      { name: "Carol", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
      { name: "David", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
      { name: "Eve", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
      { name: "Frank", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
      { name: "Grace", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
      { name: "Heidi", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
      { name: "Ivan", avatar: "https://randomuser.me/api/portraits/men/10.jpg" }
    ]
  }
];

const WatchAlong = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [form, setForm] = useState({ title: "", platform: "", date: "", time: "" });

  const generateLink = () => {
    alert("Watchalong link generated! Send it to your friends.");
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white">
      {/* NavBar */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-gray-700 bg-gray-800">
        <div className="flex space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`hover:text-blue-400 transition ${activeTab === "upcoming" ? "text-blue-500" : ""}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`hover:text-blue-400 transition ${activeTab === "schedule" ? "text-blue-500" : ""}`}
          >
            Schedule
          </button>
        </div>

        {/* Search */}
        <div
          className={`flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded transition-all duration-200 border ${
            searchActive ? "border-blue-500" : "border-transparent"
          }`}
          style={{ width: "24rem" }}
        >
          <FaSearch size={14} />
          <input
            type="text"
            placeholder="Search watchalongs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
            className="bg-transparent outline-none text-sm placeholder-gray-300 w-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6">
        {activeTab === "upcoming" && (
          <div className="space-y-6">
            {dummyUpcoming
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((item) => (
                <div key={item.id} className="flex bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <img src={item.poster} alt={item.title} className="w-40 h-60 object-cover" />
                  <div className="flex-1 p-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-400">Time: {new Date(item.date).toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Duration: {item.duration} minutes</p>
                    <p className="text-sm text-gray-400 mt-1">People Invited: {item.invited.length}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {item.invited.slice(0, 8).map((user, idx) => (
                        <img
                          key={idx}
                          src={user.avatar}
                          alt={user.name}
                          title={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-white"
                        />
                      ))}
                      {item.invited.length > 8 && (
                        <span className="text-xs text-gray-400">
                          +{item.invited.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="flex gap-6 mt-10 px-6">
            {/* Left Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                generateLink();
              }}
              className="w-1/2 space-y-4 p-6 border border-gray-500 rounded-lg bg-gray-800"
            >
              <div>
                <label className="block text-sm mb-1">Event/Movie Name</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Platform</label>
                <select
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                  required
                >
                  <option value="">Choose platform</option>
                  <option value="Netflix">Netflix</option>
                  <option value="Prime Video">Prime Video</option>
                  <option value="Disney+">Disney+</option>
                  <option value="Hulu">Hulu</option>
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Invite</label>
                <p className="text-sm text-gray-400 mb-2">
                  (Choose from Friends or Watch Party Groups — not implemented here)
                </p>
                <input
                  type="text"
                  placeholder="Search or select..."
                  className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                  disabled
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate WatchAlong Link
              </button>
            </form>

            {/* Right Additional Details */}
            <div className="w-1/2 p-6 border border-gray-500 rounded-lg bg-gray-800 space-y-6">
              <h3 className="text-lg font-semibold text-white">Additional Details</h3>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Number of Breaks</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                    placeholder="e.g. 2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Interval (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-2 rounded bg-gray-700 text-white outline-none"
                    placeholder="e.g. 15"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Permissions</label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-blue-600" />
                  Allow live chatting
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-blue-600" />
                  Allow live reactions
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-blue-600" />
                  Only host can pause/start
                </label>
              </div>

              {/* Save Changes Button */}
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => alert('Changes saved!')}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchAlong;
