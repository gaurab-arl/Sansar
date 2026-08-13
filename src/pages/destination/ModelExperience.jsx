import { useState } from "react";
import DestinationScene from "./DestinationScene";
import { X } from "lucide-react";

export default function ModelExperience({ destination, onClose }) {
    const [progress, setProgress] = useState(0);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const scrollHeight = 400; // 400vh for scrolling

    return (
        <div
            className="
              fixed
              inset-0
              z-[100]
              overflow-y-auto
              overflow-x-hidden
              bg-[#F7F7F2]
            "
            data-lenis-prevent="true"
            onScroll={(e) => {
                const element = e.currentTarget;

                const maxScroll =
                    element.scrollHeight -
                    element.clientHeight;

                const value =
                    maxScroll > 0
                        ? element.scrollTop / maxScroll
                        : 0;

                setProgress(
                    Math.max(
                        0,
                        Math.min(1, value)
                    )
                );
            }}
        >
            {/* SCROLL DISTANCE */}
            <div
                style={{
                    height: `${scrollHeight}vh`,
                }}
            />

            {/* STICKY EXPERIENCE */}
            <div
                className="
                pointer-events-none
                fixed
                inset-0
                z-0
              "
            >
                <div className="pointer-events-auto absolute inset-0">
                    <DestinationScene
                        destination={destination}
                        progress={progress}
                        onSelectHotspot={setSelectedHotspot}
                        selectedHotspot={selectedHotspot}
                    />
                </div>
            </div>

            {/* HEADER / UI */}
            <div className="fixed top-6 right-6 z-10">
                <button 
                    onClick={onClose} 
                    className="p-3 bg-white/80 rounded-full border border-black/10 hover:bg-white backdrop-blur-md transition-colors shadow-sm"
                >
                    <X size={20} className="text-black" />
                </button>
            </div>
            
            {/* HOTSPOT UI */}
            {selectedHotspot && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md bg-white/90 backdrop-blur-lg p-6 rounded-2xl border border-black/10 shadow-xl">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-medium text-black">{selectedHotspot.label}</h3>
                        <button onClick={() => setSelectedHotspot(null)} className="text-black/50 hover:text-black transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    <p className="text-sm text-black/60 leading-relaxed">
                        {selectedHotspot.description}
                    </p>
                </div>
            )}
        </div>
    );
}