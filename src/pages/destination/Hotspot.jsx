import { Html } from "@react-three/drei";

export default function Hotspot({ hotspot, isActive, onSelect }) {
    return (
        <group position={hotspot.position}>
            <Html center distanceFactor={10} zIndexRange={[10, 0]}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onSelect) {
                            onSelect(hotspot);
                        }
                    }}
                    aria-label={`View ${hotspot.label}`}
                    className="group/hotspot relative flex items-center justify-center w-6 h-6 cursor-pointer select-none pointer-events-auto"
                >
                    <span
                        className={`absolute inset-0 rounded-full ${
                            isActive ? "bg-black/30" : "bg-black/15"
                        } animate-ping`}
                    />
                    <span
                        className={`relative w-2.5 h-2.5 rounded-full border transition-colors duration-200 ${
                            isActive
                                ? "bg-black border-black scale-125"
                                : "bg-white/90 border-black/80 group-hover/hotspot:bg-black"
                        }`}
                    />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-white/90 shadow-sm border border-black/10 text-[9px] uppercase tracking-widest text-black opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {hotspot.label}
                    </span>
                </button>
            </Html>
        </group>
    );
}