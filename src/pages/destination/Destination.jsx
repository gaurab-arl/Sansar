import { useState } from "react";

import DestinationGrid from "./DestinationGrid";
import ModelExperience from "./ModelExperience";
import DurbarSquare3D from "./durbar";
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

      {activeDestination && activeDestination.id === "basantapur" && (
        <div className="fixed inset-0 z-[100]">
          <DurbarSquare3D />
          <button
            onClick={() => setActiveDestination(null)}
            className="fixed top-6 right-6 z-[110] p-3 bg-[rgba(24,17,10,0.82)] rounded-full border border-[rgba(201,160,74,0.35)] text-[#c9a04a] hover:bg-[rgba(24,17,10,0.95)] transition-colors backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {activeDestination && activeDestination.id !== "basantapur" && (
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