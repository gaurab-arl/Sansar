import { useEffect, useMemo, useState } from "react";
import DestinationScene from "./DestinationScene";
import { ChevronLeft, ChevronRight, MapPin, RotateCcw, X } from "lucide-react";

export default function ModelExperience({ destination, onClose }) {
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const hotspots = useMemo(() => destination.model.hotspots ?? [], [destination]);

    const selectedIndex = selectedHotspot
        ? hotspots.findIndex((hotspot) => hotspot.id === selectedHotspot.id)
        : -1;

    // Progress now reflects which hotspot is active (drives the camera
    // controller) instead of page scroll position.
    const progress =
        selectedIndex >= 0 && hotspots.length > 1
            ? selectedIndex / (hotspots.length - 1)
            : 0;

    const selectHotspotByIndex = (index) => {
        if (!hotspots.length) {
            return;
        }

        const safeIndex = (index + hotspots.length) % hotspots.length;
        setSelectedHotspot(hotspots[safeIndex]);
    };

    useEffect(() => {
        setSelectedHotspot(null);
    }, [destination.id]);

    return (
        <div
            className="
              fixed
              inset-0
              z-[100]
              overflow-hidden
              bg-[#F7F7F2]
            "
            data-lenis-prevent="true"
        >
            {/* EXPERIENCE */}
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
            <div className="fixed left-4 right-4 top-6 z-10 flex items-start justify-between gap-4 md:left-6 md:right-6">
                <button
                    onClick={onClose}
                    className="flex shrink-0 items-center gap-2 rounded-full bg-[#1f3a2e] px-4 py-2 shadow-lg transition-colors hover:bg-[#2d5a3d] group"
                >
                    <X size={16} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="font-jost text-xs text-white uppercase tracking-widest font-medium">Exit</span>
                </button>

                <div className="hidden max-w-[440px] rounded-lg border border-[#d8e5dc] bg-[#f5faf7]/90 px-5 py-4 text-right shadow-lg backdrop-blur-xl md:block">
                    <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c47a4a]">
                        Interactive Model
                    </p>
                    <h2 className="mt-1 font-cormorant text-3xl font-light leading-none text-[#1f3a2e]">
                        {destination.name}
                    </h2>
                    <p className="mt-2 font-jost text-xs leading-5 text-[#5a7a6a]">
                        Choose a landmark below to explore the model.
                    </p>
                </div>
            </div>

            <div className="fixed bottom-4 left-4 right-4 z-10 flex flex-col gap-3 md:bottom-6 md:left-6 md:right-auto md:w-[520px]">
                <div className="rounded-lg border border-[#d8e5dc] bg-[#f5faf7]/92 p-3 shadow-xl backdrop-blur-xl">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <MapPin size={15} className="text-[#c47a4a]" />
                            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.26em] text-[#1f3a2e]">
                                Hotspots
                            </span>
                        </div>

                        <button
                            onClick={() => setSelectedHotspot(null)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5a7a6a] transition-colors hover:bg-[#1f3a2e]/10 hover:text-[#1f3a2e]"
                            aria-label="Reset camera tour"
                            title="Reset camera tour"
                        >
                            <RotateCcw size={15} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {hotspots.map((hotspot, index) => {
                            const isActive = selectedHotspot?.id === hotspot.id;

                            return (
                                <button
                                    key={hotspot.id}
                                    onClick={() => setSelectedHotspot(hotspot)}
                                    className={`flex min-h-12 items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors ${isActive
                                            ? "border-[#c47a4a] bg-[#fff8ee] text-[#1f3a2e]"
                                            : "border-[#d8e5dc] bg-white/70 text-[#5a7a6a] hover:border-[#c47a4a]/50 hover:text-[#1f3a2e]"
                                        }`}
                                >
                                    <span className="font-jost text-[10px] font-semibold uppercase tracking-widest text-[#c47a4a]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-jost text-xs font-medium leading-4">
                                        {hotspot.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {hotspots.length > 0 && (
                    <div className="flex items-center justify-between rounded-lg border border-[#d8e5dc] bg-[#f5faf7]/92 px-3 py-2 shadow-lg backdrop-blur-xl">
                        <button
                            onClick={() => selectHotspotByIndex(selectedIndex <= 0 ? hotspots.length - 1 : selectedIndex - 1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1f3a2e] transition-colors hover:bg-[#1f3a2e]/10"
                            aria-label="Previous hotspot"
                            title="Previous hotspot"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a7a6a]">
                            {selectedHotspot
                                ? `${String(selectedIndex + 1).padStart(2, "0")} / ${String(hotspots.length).padStart(2, "0")}`
                                : `${String(hotspots.length).padStart(2, "0")} landmarks`}
                        </p>

                        <button
                            onClick={() => selectHotspotByIndex(selectedIndex < 0 ? 0 : selectedIndex + 1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1f3a2e] transition-colors hover:bg-[#1f3a2e]/10"
                            aria-label="Next hotspot"
                            title="Next hotspot"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
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