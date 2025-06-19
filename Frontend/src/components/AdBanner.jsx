import React, { useState } from "react";

const AdBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  const slide = {
    image: "/images/lotrseries.jpg",
    title: "The Lord of the Rings: The Rings of Power",
    trending: "#1 Trending",
    rating: "7.1 IMDb",
    description:
      "Epic drama set thousands of years before the events of J.R.R. Tolkien's 'The Hobbit' and 'The Lord of the Rings'.",
  };

  return (
    <div
      className="relative w-full h-[85vh] overflow-hidden font-sans bg-cover bg-center"
      style={{ backgroundImage: `url(${slide.image})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay info section */}
      <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black via-black/70 to-transparent px-10 py-8 text-white">
        <div>
          <h2 className="text-5xl font-extrabold tracking-wide">
            {slide.title.includes(":") ? (
              <>
                {slide.title.split(":")[0]}:
                <br />
                <span className="italic text-yellow-400 font-calligraphy">
                  {slide.title.split(":").slice(1).join(":").trim()}
                </span>
              </>
            ) : (
              slide.title
            )}
          </h2>
          <p className="text-md mt-1 text-gray-300">{slide.trending}</p>
          <p className="text-md text-yellow-300">{slide.rating}</p>
          <p
            className={`text-sm mt-4 max-w-xl leading-relaxed transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.description}
          </p>
          <div className="flex flex-col w-40">
          <button className="mt-6 px-6 py-2 bg-white hover:bg-blue-800 hover:text-gray-200 rounded-lg text-blue-950 font-semibold transition shadow">
            Watch Now
          </button>
          <button className="mt-6 px-6 py-2 bg-transparent border-[2px] border-white hover:bg-white hover:text-blue-950 rounded-lg text-white font-semibold transition shadow">
            More Details
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
