import React, { useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VoiceAssistant = ({ darkMode, toggleTheme }) => {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
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
    else if (cmd.includes("netflix")) navigate("/netflix");
    else if (cmd.includes("prime")) navigate("/prime-video");
    else if (cmd.includes("disney")) navigate("/disney");
    else if (cmd.includes("hulu")) navigate("/hulu");
    else if (cmd.includes("youtube music")) navigate("/youtube-music");
    else if (cmd.includes("youtube")) navigate("/youtube");
    else alert("Command not recognized: " + command);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleCommand(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current.start();
  };

  const sendAudioForEmotion = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "voice.wav");

    try {
      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`Detected Emotion: ${res.data.emotion}`);
    } catch (err) {
      console.error("Emotion API error:", err);
      alert("Error detecting emotion");
    }
  };

  const handleVoiceClick = async () => {
    if (!recording) {
      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        sendAudioForEmotion(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);

      // Also trigger speech recognition in parallel
      startSpeechRecognition();
    } else {
      // Stop recording
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <button
      onClick={handleVoiceClick}
      title="Voice Command & Emotion"
      className={`${
        recording ? "animate-pulse" : ""
      } bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-200`}
    >
      <FaMicrophone size={20} />
    </button>
  );
};

export default VoiceAssistant;
