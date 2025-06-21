import React from "react";
import VoiceLine from "./ui/VoiceLine";
import ConnectorDash from "./ui/ConnectorDash";
import InvertConnectorDash from "./ui/InvertConnectorDash";

const Diagram = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 py-20 flex justify-between">
      {/* ✅ Floating connector (positioned absolutely, does not affect layout) */}
      <div className=" absolute top-[4vh] left-[-4vw] z-20 pointer-events-none">
        <ConnectorDash />
      </div>
      <div className=" absolute bottom-[7vh] right-[14vw] z-20 pointer-events-none">
        <InvertConnectorDash />
      </div>

      {/* Content layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative h-[30vh] mt-[11vh] mr-10 ml-[-15vw]">
        {/* Tone Detector */}
        <div className="bg-blue-950/80 cursor-pointer border border-purple-500 text-purple-400 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Tone Detector</h2>
          <div className="mt-5">
            <h4>Voice</h4>
            <VoiceLine />
          </div>
        </div>

        {/* Emotion Detector */}
        <div className="bg-blue-950/80 cursor-pointer border border-pink-500 rounded-2xl shadow-lg p-6 text-pink-400 text-center">
          <h2 className="text-xl font-semibold">Emotion Detector</h2>
          <div className="flex flex-col items-left mt-3">
            <h4>Tone :</h4>
            <h4>Weather :</h4>
            <h4>Temperature :</h4>
            <h4>Past Behaviour</h4>
          </div>
        </div>

        {/* Recommendation Modal */}
        <div className="bg-blue-950/80 cursor-pointer border border-blue-500 rounded-2xl shadow-lg p-6 text-blue-400 text-center">
          <h2 className="text-xl font-semibold">Recommendation Modal</h2>
          <div className="flex flex-col items-left mt-3">
            <h4>Emotion Detected :</h4>
            <h4>Sleep Time :</h4>
            <h4>Time of Day :</h4>
            <h4>Genre of Element :</h4>
            <h4>Playtime of Element :</h4>
            <h4>imdb rating of Element :</h4>
            <h4>Trend of Element :</h4>
          </div>
        </div>
      </div>

      {/* Right divider */}
      <div className="w-px h-[60vh] border-l-2 border-green-400 z-10">
        {/* final entries go here */}
      </div>
    </div>
  );
};

export default Diagram;
