import React from "react";

// Dummy content
const dummyRows = [
  {
    title: "Trending Now",
    images: [
      "https://picsum.photos/300/160?random=1",
      "https://picsum.photos/300/160?random=2",
      "https://picsum.photos/300/160?random=3",
      "https://picsum.photos/300/160?random=4",
      "https://picsum.photos/300/160?random=5",
    ],
  },
  {
    title: "Top Picks For You",
    images: [
      "https://picsum.photos/300/160?random=6",
      "https://picsum.photos/300/160?random=7",
      "https://picsum.photos/300/160?random=8",
      "https://picsum.photos/300/160?random=9",
      "https://picsum.photos/300/160?random=10",
    ],
  },
  {
    title: "Critically Acclaimed",
    images: [
      "https://picsum.photos/300/160?random=11",
      "https://picsum.photos/300/160?random=12",
      "https://picsum.photos/300/160?random=13",
      "https://picsum.photos/300/160?random=14",
      "https://picsum.photos/300/160?random=15",
    ],
  },
];

const Netflix = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/80 to-transparent fixed top-0 w-full z-10">
        <div className="text-2xl font-bold text-red-600">NETFLIX</div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">TV Shows</a>
          <a href="#" className="hover:underline">Movies</a>
          <a href="#" className="hover:underline">Latest</a>
          <a href="#" className="hover:underline">My List</a>
        </div>
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[90vh] w-full bg-cover bg-center flex items-end" style={{
        backgroundImage: `url('https://picsum.photos/1600/900?blur')`
      }}>
        <div className="bg-gradient-to-t from-black to-transparent w-full p-8">
          <h1 className="text-4xl font-bold mb-2">Featured Movie</h1>
          <p className="max-w-md text-sm mb-4">This is a description of the featured movie. It’s thrilling, action-packed, and binge-worthy.</p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-2 font-semibold rounded">Play</button>
            <button className="bg-gray-700 text-white px-6 py-2 font-semibold rounded">More Info</button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="mt-[-100px] pt-[120px] px-6 space-y-12">
        {dummyRows.map((row, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold mb-2">{row.title}</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {row.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="poster"
                  className="w-[200px] h-[120px] rounded-md object-cover hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Netflix;
