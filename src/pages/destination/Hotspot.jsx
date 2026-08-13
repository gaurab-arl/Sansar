import { Html } from "@react-three/drei";

export default function Hotspot({ hotspot, isActive, onSelect }) {
    return (
        <group position={hotspot.position}>
            <Html distanceFactor={8} occlude zIndexRange={[10, 0]}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onSelect) {
                            onSelect(hotspot);
                        }
                    }}
                    aria-label={`View ${hotspot.label}`}
                    className="group/hotspot relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                >
                    <span
                        className={`absolute inset-0 rounded-full ${isActive ? "bg-black/40" : "bg-black/20"
                            } animate-ping`}
                    />
                    <span
                        className={`relative w-2.5 h-2.5 rounded-full border transition-colors ${isActive
                            ? "bg-black border-black"
                            : "bg-white/80 border-black group-hover/hotspot:bg-black"
                            }`}
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-white/80 backdrop-blur-md border border-black/20 text-[9px] uppercase tracking-widest text-black opacity-0 group-hover/hotspot:opacity-100 transition-opacity">
                        {hotspot.label}
                    </span>
                </button>
            </Html>
        </group>
    );
}