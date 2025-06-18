import React from "react";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-transparent text-white px-48 py-3 shadow-md flex items-center font-serif justify-between z-50 backdrop-blur">
      <div className="flex items-center space-x-6 text-lg tracking-wider gap-12">
        <span className="cursor-pointer hover:text-white">Home</span>
        <span className="cursor-pointer hover:text-white">Movies</span>
        <span className="cursor-pointer hover:text-white">TV Shows</span>
        <span className="cursor-pointer hover:text-white">Sports</span>
        <span className="cursor-pointer hover:text-white">Live</span>
        <span className="mx-4 border-l border-white h-5" />
        <span className="cursor-pointer hover:text-white">Subscriptions</span>
        <span className="cursor-pointer hover:text-white">Profile</span>
        <FaSearch className="cursor-pointer hover:text-white" />
      </div>
    </nav>
  );
};

export default Navbar;
