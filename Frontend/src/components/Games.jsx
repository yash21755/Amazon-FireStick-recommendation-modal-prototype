// src/pages/Games.jsx
import React, { useEffect, useRef } from "react";

const games = [
  { name: "Sonic the Hedgehog", logo: "/games/sonic.jpg" },
  { name: "Beach Buggy Racing", logo: "/games/beachbuggy.jpg" },
  { name: "Hill Climb Racing", logo: "/games/hillclimb.jpg" },
  { name: "Tetris", logo: "/games/tetris.png" },
  { name: "Asphalt 8", logo: "/games/asphalt8.jpg" },
  { name: "Pac-Man", logo: "/games/pacman.png" },
  { name: "Stunt Extreme 3D", logo: "/games/stunt.jpg" },
  { name: "Chess", logo: "/games/chess.jpg" },
];

const Games = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleWheel = (e) => {
      if (e.deltaY > 0 || e.deltaX > 0) {
        slider.scrollLeft += 70;
      } else {
        slider.scrollLeft -= 70;
      }
    };

    slider.addEventListener("wheel", handleWheel);
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="p-6 text-white">
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {games.map((game, idx) => (
          <div
            key={idx}
            className="min-w-[360px] h-[180px] rounded-2xl overflow-hidden relative group shrink-0 cursor-pointer"
          >
            <img
              src={game.logo}
              alt={game.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-sm">
              {game.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
