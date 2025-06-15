import React, { useState } from "react";
import {
  FaUser,
  FaRegClock,
  FaCog,
  FaMoon,
  FaSun,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaUsers,
  FaHistory,
  FaVideo,
  FaHome
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBarMenu = ({ darkMode, toggleTheme }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setExpanded(!expanded);

  const menuItems = [
    { icon: <FaHome size={20} />, label: "Home", onClick: () => navigate("/") },
    { icon: <FaUser size={20} />, label: "Profile" },
    { icon: <FaRegClock size={20} />, label: "Sleep Timer" },
    { icon: <FaCog size={20} />, label: "Settings" },
    {
      icon: darkMode ? <FaSun size={20} /> : <FaMoon size={20} />,
      label: "Toggle Theme",
      onClick: toggleTheme
    },
    { icon: <FaUsers size={20} />, label: "My Network", onClick: () => navigate("/my-network") },
    { icon: <FaHistory size={20} />, label: "Memory Lane", onClick: () => navigate("/memory-lane") },
    { icon: <FaVideo size={20} />, label: "Watch Along", onClick: () => navigate("/watch-along") }
  ];

  return (
    <div
      className={`h-screen min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#1e293b] text-white" : "bg-gray-400 text-gray-900"
      } flex flex-col ${expanded ? "w-1/6 min-w-[200px]" : "w-[50px]"}`}
      style={{ height: "100vh" }}
    >
      {/* Expand/Collapse Button */}
      <div
        onClick={toggleSidebar}
        className={`flex items-center justify-center py-4 cursor-pointer hover:bg-gray-700 ${
          !darkMode ? "hover:bg-gray-200" : ""
        }`}
        title={expanded ? "Collapse" : "Expand"}
      >
        {expanded ? <FaAngleDoubleLeft size={20} /> : <FaAngleDoubleRight size={20} />}
        {expanded && <span className="ml-3 text-sm">Collapse</span>}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-start mt-4 space-y-4">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            title={item.label}
            onClick={item.onClick}
            className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 ${
              !darkMode ? "hover:bg-gray-200" : ""
            }`}
          >
            <div>{item.icon}</div>
            {expanded && <span className="ml-3 text-sm">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBarMenu;
