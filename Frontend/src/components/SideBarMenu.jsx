import React, { useState, useRef } from "react";
import VoiceAssistant from "./VoiceAssistant";
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
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBarMenu = ({ darkMode, toggleTheme, onOpenSleep }) => {
  const [expanded, setExpanded] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setExpanded(!expanded);

  const handleCommand = (command) => {
    const cmd = command.toLowerCase();

    if (cmd.includes("home")) navigate("/");
    else if (cmd.includes("profile")) navigate("/profile");
    else if (cmd.includes("timer")) onOpenSleep();
    else if (cmd.includes("settings")) alert("Opening Settings...");
    else if (cmd.includes("theme")) toggleTheme();
    else if (cmd.includes("dark")) !darkMode && toggleTheme();
    else if (cmd.includes("light")) darkMode && toggleTheme();
    else if (cmd.includes("network")) navigate("/my-network");
    else if (cmd.includes("memory")) navigate("/memory-lane");
    else if (cmd.includes("watch")) navigate("/watch-along");
    else alert("Command not recognized: " + command);
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice commands.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleCommand(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Voice error:", event.error);
        alert("Voice recognition error: " + event.error);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    setListening(true);
    recognitionRef.current.start();
  };

  const menuItems = [
    { icon: <FaHome size={20} />, label: "Home", onClick: () => navigate("/") },
    { icon: <FaUser size={20} />, label: "Profile", onClick: () => navigate("/profile") },
    { icon: <FaRegClock size={20} />, label: "Sleep Timer", onClick: onOpenSleep },
    { icon: <FaCog size={20} />, label: "Settings", onClick: () => alert("THIS IS A PROTOTYPE\nSettings not implemented yet") },
    {
      icon: darkMode ? <FaSun size={20} /> : <FaMoon size={20} />,
      label: "Toggle Theme",
      onClick: toggleTheme,
    },
    { icon: <FaUsers size={20} />, label: "My Network", onClick: () => navigate("/my-network") },
    { icon: <FaHistory size={20} />, label: "Memory Lane", onClick: () => navigate("/memory-lane") },
    { icon: <FaVideo size={20} />, label: "Watch Along", onClick: () => navigate("/watch-along") },
  ];

  return (
    <div
      className={`h-screen flex flex-col justify-between transition-all duration-300 ${
        darkMode ? "bg-[#1e293b] text-white" : "bg-gray-400 text-gray-900"
      } ${expanded ? "w-1/6 min-w-[200px]" : "w-[50px]"}`}
    >
      <div>
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

      <div className="p-4 flex justify-center">
        <VoiceAssistant darkMode={darkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default SideBarMenu;
