// components/VoiceAssistant.jsx
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
    else if (cmd.includes("profile")) alert("Navigating to Profile...");
    else if (cmd.includes("timer")) alert("Opening Sleep Timer...");
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
      className={`${
        listening ? "animate-pulse" : ""
      } bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition duration-200`}
    >
      <FaMicrophone size={20} />
    </button>
  );
};

export default VoiceAssistant;
