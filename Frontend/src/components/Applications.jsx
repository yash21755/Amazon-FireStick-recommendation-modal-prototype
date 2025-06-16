import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apps = [
  { name: "Prime Video", logo: "/logos/prime.webp", route: "/prime-video" },
  { name: "Netflix", logo: "/logos/netflix.png", route: "/netflix" },
  { name: "Disney+", logo: "/logos/disney.jpg", route: "/disney" },
  { name: "Hulu", logo: "/logos/hulu.svg", route: "/hulu" },
  { name: "YouTube", logo: "/logos/yt.jpg", route: "/youtube" },
  { name: "YouTube Music", logo: "/logos/ytm.jpg", route: "/youtube-music" },
];

const Applications = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Scroll horizontally on wheel scroll
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
        {apps.map((app, idx) => (
          <div
            key={idx}
            className="min-w-[360px] h-[180px] rounded-2xl overflow-hidden relative group shrink-0 cursor-pointer"
            onClick={() => app.route && navigate(app.route)}
            tabIndex={0}
            role="button"
            aria-label={app.name}
          >
            <img
              src={app.logo}
              alt={app.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-sm">
              {app.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
