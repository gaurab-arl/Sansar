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
            <div className="fixed top-6 left-6 z-10">
                <button 
                    onClick={onClose} 
                    className="flex items-center gap-2 px-4 py-2 bg-[#1f3a2e] rounded-full hover:bg-[#2d5a3d] transition-colors shadow-lg group"
                >
                    <X size={16} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="font-jost text-xs text-white uppercase tracking-widest font-medium">Exit</span>
                </button>
            </div>
            
            {/* HOTSPOT UI SIDEBAR */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#f5faf7]/95 backdrop-blur-2xl border-l border-[#e8f0ec] shadow-2xl z-20 transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${selectedHotspot ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-8 h-full flex flex-col mt-20">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#e8f0ec]">
                        <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">Location Details</span>
                        <button onClick={() => setSelectedHotspot(null)} className="p-2 hover:bg-[#1f3a2e]/10 rounded-full transition-colors">
                            <X size={20} className="text-[#1f3a2e]" />
                        </button>
                    </div>
                    {selectedHotspot && (
                        <div className="animate-fadeIn">
                            <h3 className="font-cormorant text-4xl font-light italic text-[#1f3a2e] mb-6 leading-tight">{selectedHotspot.label}</h3>
                            <p className="font-jost text-base font-light text-[#5a7a6a] leading-relaxed">
                                {selectedHotspot.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}