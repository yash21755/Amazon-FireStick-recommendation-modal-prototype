import React, { useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VoiceAssistant = ({ darkMode, toggleTheme }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleCommand = (command) => {
    const cmd = command.toLowerCase();

    if (cmd.includes("home")) navigate("/");
    else if (cmd.includes("profile")) navigate("/profile");
    else if (cmd.includes("timer") || cmd.includes("sleep") || cmd.includes("sleeping")) navigate("/sleep-timer");
    else if (cmd.includes("settings")) alert("THIS IS A PROTOTYPE \nsettings is not implemented here");
    else if (cmd.includes("theme")) toggleTheme();
    else if (cmd.includes("dark")) !darkMode && toggleTheme();
    else if (cmd.includes("light")) darkMode && toggleTheme();
    else if (cmd.includes("network")) navigate("/my-network");
    else if (cmd.includes("movies")) navigate("/prime-video/movies");
    else if (cmd.includes("series") || cmd.includes("tv") || cmd.includes("shows")) navigate("/prime-video/series");
    else if (cmd.includes("memory")) navigate("/memory-lane");
    else if (cmd.includes("watch")) navigate("/watch-along");
    else if (cmd.includes("netflix")) navigate("/netflix");
    else if (cmd.includes("prime")) navigate("/prime-video");
    else if (cmd.includes("disney")) navigate("/disney");
    else if (cmd.includes("hulu")) navigate("/hulu");
    else if (cmd.includes("youtube music")) navigate("/youtube-music");
    else if (cmd.includes("youtube")) navigate("/youtube");
    else alert("Command not recognized: " + command);
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
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
        console.error("Voice recognition error:", event.error);
        if (event.error === "network") {
          alert("Network error: Check internet or HTTPS requirement.");
        } else if (event.error === "not-allowed") {
          alert("Microphone permission denied.");
        } else {
          alert("Voice recognition error: " + event.error);
        }
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    setListening(true);
    recognitionRef.current.start();
  };

  return (
    <button
      onClick={handleVoiceCommand}
      title="Voice Command"
      className={` ${
        darkMode
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : "bg-gray-300 hover:bg-gray-400 text-blue-400 hover:text-black"
      } p-2 rounded-full shadow-lg transition duration-200`}
    >
      <FaMicrophone size={20} />
    </button>
  );
};

export default VoiceAssistant;
