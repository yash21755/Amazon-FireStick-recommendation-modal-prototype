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
  ChevronLeftIcon,
  ChevronRightIcon,
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
      {/* top: Alexa */}
      <div className="flex space-x-4">
        <button
          title="Alexa Voice Command"
          onClick={handleClick("alexa")}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-500"
        >
          <MicrophoneIcon className="w-6 h-6" />
        </button>
      </div>
      {/* big D‑pad */}
     <div className="flex items-center justify-center m-6">
  {/* Black ring wrapper */}
  <div className="relative w-40 h-40 rounded-full bg-gray-900 flex items-center justify-center">
    
    {/* Up button */}
    <button
      title="Up"
      onClick={handleClick("up")}
      className="absolute top-2 left-1/2 transform -translate-x-1/2 p-2 rounded-full"
    >
      <ChevronUpIcon className="w-6 h-6 text-white" />
    </button>

    {/* Left button */}
    <button
      title="Left"
      onClick={handleClick("left")}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
    >
      <ChevronLeftIcon className="w-6 h-6 text-white" />
    </button>

    {/* Center select/OK button */}
    <button
      title="Select / OK"
      onClick={handleClick("select")}
      className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 text-white"
    >
      OK
    </button>

    {/* Right button */}
    <button
      title="Right"
      onClick={handleClick("right")}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
    >
      <ChevronRightIcon className="w-6 h-6 text-white" />
    </button>

    {/* Down button */}
    <button
      title="Down"
      onClick={handleClick("down")}
      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 rounded-full"
    >
      <ChevronDownIcon className="w-6 h-6 text-white" />
    </button>
  </div>
</div>


      {/* nav row */}
      <div className="grid grid-cols-3 gap-2">
        <button
          title="Back"
          onClick={handleClick("back")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <button
          title="Home"
          onClick={handleClick("home")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <HomeIcon className="w-6 h-6" />
        </button>
        <button
          title="Menu"
          onClick={handleClick("menu")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* playback row */}
      <div className="grid grid-cols-3 gap-2">
        <button
          title="Rewind"
          onClick={handleClick("rewind")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <RewindIcon className="w-6 h-6" />
        </button>
        <button
          title="Play / Pause"
          onClick={handleClick("playpause")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <PlayIcon className="w-6 h-6" />
        </button>
        <button
          title="Fast Forward"
          onClick={handleClick("forward")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <FastForwardIcon className="w-6 h-6" />
        </button>
      </div>

      {/* volume & channel */}
      <div className="grid grid-cols-3 gap-2 items-center">
        <button
          title="Volume Up"
          onClick={handleClick("vol-up")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
        <button
          title="TV Input"
          onClick={handleClick("tv")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <TvIcon className="w-6 h-6" />
        </button>
        <button
          title="Channel Up"
          onClick={handleClick("chan-up")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>

        <button
          title="Volume Down"
          onClick={handleClick("vol-down")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <MinusIcon className="w-6 h-6" />
        </button>
        <button
          title="Mute"
          onClick={handleClick("mute")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <VolumeOffIcon className="w-6 h-6" />
        </button>
        <button
          title="Channel Down"
          onClick={handleClick("chan-down")}
          className="p-4 rounded-full ml-3 mb-1 bg-gray-900 hover:bg-gray-700"
        >
          <ChevronDownIcon className="w-6 h-6" />
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
