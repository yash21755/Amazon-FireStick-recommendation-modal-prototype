import React, { useState, useEffect, useRef } from "react";

const SleepTime = ({ onClose }) => {
  const modalRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);
  const [sleepTime, setSleepTime] = useState(localStorage.getItem("sleepTime") || "");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const handleSetTime = () => {
    if (sleepTime) {
      localStorage.setItem("sleepTime", sleepTime);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Sleep Time</h2>
        <p className="text-gray-300 mb-4">
          Set a specific time after which you intend to stop watching or prefer not to continue using Fire TV.
        </p>

        <div className="mb-6">
          <label className="block text-gray-400 font-medium mb-1" htmlFor="sleep-time">
            Select Time
          </label>
          <input
            type="time"
            id="sleep-time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-white"
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4 transition"
          onClick={handleSetTime}
        >
          Set Sleep Time
        </button>

        <div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full text-left text-blue-400 font-medium py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
          >
            How we use your sleep time
          </button>
          {showInfo && (
            <ul className="mt-3 list-disc list-inside text-sm text-gray-300 space-y-2 px-4">
              <li>We will notify you when your selected sleep time is reached to suggest turning off Fire TV.</li>
              <li>After that, we'll remind you every 30 minutes to stop using applications.</li>
              <li>This time helps us recommend movies or episodes you can finish before your sleep time.</li>
            </ul>
          )}
        </div>

        {showAlert && (
          <div className="mt-4 text-green-400 text-sm text-center">
            ✅ Sleep time set to {sleepTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepTime;
