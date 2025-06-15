import React from "react";
// import { PowerIcon, … } from "@heroicons/react/outline";

import {
  MicrophoneIcon,
  ArrowLeftIcon,
  HomeIcon,
  MenuIcon,
  PlayIcon,
  PlusIcon,
  MinusIcon,
  DeviceTabletIcon as TvIcon, // Use DeviceTabletIcon as TV icon substitute
  ChevronUpIcon,
  ChevronDownIcon,
  VolumeOffIcon, // Replace SpeakerXMarkIcon with VolumeOffIcon
  RewindIcon,
  FastForwardIcon,
  SwitchHorizontalIcon, // Use as power icon substitute
} from "@heroicons/react/outline";

const Remote = () => {
  const handleClick = (name) => () => {
    console.log(`${name} pressed`);
    // → hook your own logic in here
  };

  return (
    <div className="fixed top-0 right-0 h-full w-1/5 bg-gray-800 text-white flex flex-col items-center p-4 space-y-4">
      {/* top: power & Alexa */}
      <div className="flex space-x-4">
        <button
          title="Power"
          onClick={handleClick("power")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <SwitchHorizontalIcon className="w-6 h-6" />
        </button>
        <button
          title="Alexa Voice Command"
          onClick={handleClick("alexa")}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-500"
        >
          <MicrophoneIcon className="w-6 h-6" />
        </button>
      </div>

      {/* big D‑pad */}
      <div className="space-y-2">
        <button
          title="Up"
          onClick={handleClick("up")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
        <div className="flex space-x-2">
          <button
            title="Left"
            onClick={handleClick("left")}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <button
            title="Select / OK"
            onClick={handleClick("select")}
            className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
          >
            OK
          </button>
          <button
            title="Right"
            onClick={handleClick("right")}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <ChevronUpIcon className="w-6 h-6 rotate-90" />
          </button>
        </div>
        <button
          title="Down"
          onClick={handleClick("down")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronDownIcon className="w-6 h-6" />
        </button>
      </div>

      {/* nav row */}
      <div className="grid grid-cols-3 gap-2">
        <button
          title="Back"
          onClick={handleClick("back")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <button
          title="Home"
          onClick={handleClick("home")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <HomeIcon className="w-5 h-5" />
        </button>
        <button
          title="Menu"
          onClick={handleClick("menu")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {/* playback row */}
      <div className="grid grid-cols-3 gap-2">
        <button
          title="Rewind"
          onClick={handleClick("rewind")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <RewindIcon className="w-5 h-5" />
        </button>
        <button
          title="Play / Pause"
          onClick={handleClick("playpause")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <PlayIcon className="w-5 h-5" />
        </button>
        <button
          title="Fast Forward"
          onClick={handleClick("forward")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <FastForwardIcon className="w-5 h-5" />
        </button>
      </div>

      {/* volume & channel */}
      <div className="grid grid-cols-3 gap-2 items-center">
        <button
          title="Volume Up"
          onClick={handleClick("vol-up")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
        <button
          title="TV Input"
          onClick={handleClick("tv")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <TvIcon className="w-5 h-5" />
        </button>
        <button
          title="Channel Up"
          onClick={handleClick("chan-up")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </button>

        <button
          title="Volume Down"
          onClick={handleClick("vol-down")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
        <button
          title="Mute"
          onClick={handleClick("mute")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <VolumeOffIcon className="w-5 h-5" />
        </button>
        <button
          title="Channel Down"
          onClick={handleClick("chan-down")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 1 & 2 */}
      <div className="grid grid-cols-2 gap-2">
        <button
          title="1"
          onClick={handleClick("1")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          1
        </button>
        <button
          title="2"
          onClick={handleClick("2")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          2
        </button>
      </div>

      {/* branded shortcuts */}
      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          title="Prime Video"
          onClick={handleClick("prime")}
          className="w-full py-2 rounded hover:bg-gray-700"
        >
          Prime Video
        </button>
        <button
          title="Netflix"
          onClick={handleClick("netflix")}
          className="w-full py-2 rounded hover:bg-gray-700"
        >
          Netflix
        </button>
        <button
          title="Disney+"
          onClick={handleClick("disney")}
          className="w-full py-2 rounded hover:bg-gray-700"
        >
          Disney
        </button>
        <button
          title="Hulu"
          onClick={handleClick("hulu")}
          className="w-full py-2 rounded hover:bg-gray-700"
        >
          Hulu
        </button>
      </div>

      {/* Fire TV label */}
      <div className="mt-auto text-gray-500">fire tv</div>
    </div>
  );
};

export default Remote;
