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
    <nav className="fixed top-0 w-full bg-transparent text-gray-300 px-5 shadow-md flex justify-between z-50 backdrop-blur">
      <div className="flex-shrink-0">
        <img src="./images/primevid.png" alt="" className="h-10 w-auto"/>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex items-center text-m tracking-wider gap-12">
          <span className="cursor-pointer hover:text-white" onClick={() => navigate("/prime-video")}>Home</span>
          <span className="cursor-pointer hover:text-white" onClick={() => navigate("/prime-video/movies")}>Movies</span>
          <span className="cursor-pointer hover:text-white" onClick={() => navigate("/prime-video/series")}>TV Shows</span>
          <span className="cursor-pointer hover:text-white">Sports</span>
          <span className="cursor-pointer hover:text-white">Live</span>
          <span className="border-l border-gray-300 h-5" />
          <span className="cursor-pointer hover:text-white">Subscription</span>
          <span className="cursor-pointer hover:text-white">Profile</span>
          <div className="relative flex items-center" style={{ minWidth: "40px" }}>
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
                className="ml-2 px-3 rounded-full bg-transparent text-white border border-gray-300 w-56 z-50 transition-all duration-200"
                style={{ minWidth: "180px", position: "static" }}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
