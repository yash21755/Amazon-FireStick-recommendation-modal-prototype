import React from "react";

const InvertedAnimatedTopCircle = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        viewBox="0 0 200 100"
        className="w-64 h-32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="inverted-gradient-stroke" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path
          d="M 0 0 A 100 100 0 0 0 200 0"
          stroke="url(#inverted-gradient-stroke)"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeDashoffset="0"
          className="animate-dash"
        />
      </svg>
    </div>
  );
};

export default InvertedAnimatedTopCircle;
