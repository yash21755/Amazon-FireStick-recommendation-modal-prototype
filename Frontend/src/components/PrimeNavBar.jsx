import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSearchIconClick = () => {
    setShowSearch((v) => !v);
    if (!showSearch && onSearch) onSearch(""); // clear search when closing
    setSearch("");
  };

  return (
    <nav className="fixed top-0 w-full bg-transparent text-white px-48 py-3 shadow-md flex items-center font-serif justify-between z-50 backdrop-blur">
      <div className="flex items-center space-x-6 text-lg tracking-wider gap-12">
        <span className="cursor-pointer hover:text-white" onClick={() => navigate("/prime-video")}>Home</span>
        <span className="cursor-pointer hover:text-white" onClick={() => navigate("/prime-video/movies")}>Movies</span>
        <span className="cursor-pointer hover:text-white" onClick={() => navigate("/prime-video/series")}>TV Shows</span>
        <span className="cursor-pointer hover:text-white">Sports</span>
        <span className="cursor-pointer hover:text-white">Live</span>
        <span className="mx-4 border-l border-white h-5" />
        <span className="cursor-pointer hover:text-white">Subscription</span>
        <span className="cursor-pointer hover:text-white">Profile</span>
        <div className="relative">
          <FaSearch
            className="cursor-pointer hover:text-white"
            onClick={handleSearchIconClick}
          />
          {showSearch && (
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="absolute right-0 mt-2 px-3 py-1 rounded bg-gray-800 text-white border border-gray-700 w-56 z-50"
              style={{ minWidth: "180px" }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
