import { useState } from "react";

import DestinationGrid from "./DestinationGrid";
import ModelExperience from "./ModelExperience";
import { destinationsData } from "./destinationData";

export default function Destination() {
  const [activeDestination, setActiveDestination] =
    useState(null);

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F7F2]
        text-black
      "
    >
      {!activeDestination && (
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-6
            py-20
            md:px-10
            md:py-28
            lg:py-36
          "
        >
          <DestinationGrid
            destinations={destinationsData}
            onEnterModel={setActiveDestination}
          />
        </div>
      )}

      {activeDestination && (
        <ModelExperience
          destination={activeDestination}
          onClose={() =>
            setActiveDestination(null)
          }
        />
      )}
    </main>
  );
}