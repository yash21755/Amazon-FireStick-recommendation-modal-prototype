import React, { useEffect, useState, useRef } from "react";

const slides = [
  {
    image: "/images/inception.png",
    title: "Inception",
    platform: "Watch now on Netflix",
    trending: "#1 Trending",
    rating: "8.8 IMDb",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
  },
  {
    image: "/images/oppenhiemer.jpg",
    title: "Oppenheimer",
    platform: "Watch now on Prime Video",
    trending: "#2 Trending",
    rating: "8.5 IMDb",
    description:
      "The story of J. Robert Oppenheimer and the creation of the atomic bomb during World War II.",
  },
  // Add more slides as needed
];

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, isHovered]);

  return (
    <div className="relative w-full h-[55vh] overflow-hidden font-sans">
      {/* Search bar
      <div className="fixed top-4 right-6 z-50 backdrop-blur-md bg-black/80 p-2 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-1 rounded bg-transparent outline-none text-white placeholder-white"
        />
      </div> */}

      {/* Slide container */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay info section */}
            <div
              className={`absolute left-0 top-0 h-full w-full flex items-center transition-opacity duration-1000 ${
                current === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-1/2 h-full flex items-center bg-gradient-to-r from-black via-black/70 to-transparent px-10 py-8 text-white">
                <div>
                  <h2 className="text-4xl font-extrabold tracking-wide">{slide.title}</h2>
                  <p className="text-lg mt-3 font-medium">{slide.platform}</p>
                  <p className="text-md mt-1 text-gray-300">{slide.trending}</p>
                  <p className="text-md text-yellow-300">{slide.rating}</p>
                  <p
                    className={`text-sm mt-4 leading-relaxed transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fire TV logo at top right */}
      <div className="absolute top-4 left-6 z-20">
        <img src="/logos/firetvlogo.png" alt="Fire Tv" className="h-6 w-auto" />
      </div>
    </div>
  );
};

export default HomeBanner;
