import React from "react";
import { HeroHighlight } from "../components/ui/hero-highlight.jsx";
import Diagram from "../components/Diagram.jsx";

const ModalVisualisation = () => {
  return (
    <div className="h-screen w-full">
      <HeroHighlight>
        <div className="h-full w-full">
          <Diagram />
        </div>
      </HeroHighlight>
    </div>
  );
};

export default ModalVisualisation;
