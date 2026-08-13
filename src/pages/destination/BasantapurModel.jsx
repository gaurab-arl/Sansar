import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";

/**
 * Example shape this component expects on `destination.model`:
 *
 * model: {
 *   glbUrl: "/models/basantapur.glb",
 *   cameraPosition: [4, 3, 6],
 *   hotspots: [
 *     { id: "kasthamandap", label: "Kasthamandap", position: [0.2, 1.1, -0.4], description: "..." },
 *     { id: "kumari-ghar", label: "Kumari Ghar", position: [-0.5, 0.9, 0.3], description: "..." },
 *     { id: "taleju-temple", label: "Taleju Temple", position: [1.1, 1.6, 0.1], description: "..." },
 *   ],
 * }
 */

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

// Manual hotspot marker — an invisible click target + a floating pulsing dot,
// positioned wherever you place it in world space (independent of mesh names).
function Hotspot({ hotspot, index, isActive, onSelect }) {
    return (
        <group position={hotspot.position}>
            <Html distanceFactor={8} occlude zIndexRange={[10, 0]}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(hotspot);
                    }}
                    aria-label={`View ${hotspot.label}`}
                    className="group/hotspot relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                >
                    <span
                        className={`absolute inset-0 rounded-full ${isActive ? "bg-primary/40" : "bg-primary/20"
                            } animate-ping`}
                    />
                    <span
                        className={`relative w-2.5 h-2.5 rounded-full border transition-colors ${isActive
                                ? "bg-primary border-primary"
                                : "bg-background/80 border-primary group-hover/hotspot:bg-primary"
                            }`}
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-background/80 backdrop-blur-md border border-outline-variant/20 font-label-caps text-[9px] uppercase tracking-widest text-on-surface opacity-0 group-hover/hotspot:opacity-100 transition-opacity">
                        {String(index + 1).padStart(2, "0")} — {hotspot.label}
                    </span>
                </button>
            </Html>
        </group>
    );
}

export default function BasantapurModel({ destination }) {
    const { model, name } = destination;
    const [active, setActive] = useState(null);
    const panelRef = useRef(null);

    useEffect(() => {
        if (active && panelRef.current) {
            gsap.fromTo(
                panelRef.current,
                { clipPath: "inset(100% 0 0 0)", opacity: 0 },
                { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [active]);

    const closePanel = () => {
        if (!panelRef.current) return setActive(null);
        gsap.to(panelRef.current, {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => setActive(null),
        });
    };

    const activeIndex = active ? model.hotspots.findIndex((h) => h.id === active.id) : -1;

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-background border border-outline-variant/10">
            <Canvas camera={{ position: model.cameraPosition ?? [4, 3, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
                    <Model url={model.glbUrl} />
                    {model.hotspots.map((hotspot, i) => (
                        <Hotspot
                            key={hotspot.id}
                            hotspot={hotspot}
                            index={i}
                            isActive={active?.id === hotspot.id}
                            onSelect={setActive}
                        />
                    ))}
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
            </Canvas>

            {/* Eyebrow badge, top-left */}
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-outline-variant/30 pointer-events-none">
                <span className="material-symbols-outlined text-[14px] text-primary">view_in_ar</span>
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface">
                    {name} · Interactive
                </span>
            </div>

            {/* Numbered index, top-right — Zentry-style running count of hotspots */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                {model.hotspots.map((hotspot, i) => {
                    const isActive = active?.id === hotspot.id;
                    return (
                        <button
                            key={hotspot.id}
                            onClick={() => setActive(hotspot)}
                            className={`flex items-center gap-2 font-label-caps text-[10px] uppercase tracking-widest transition-colors ${isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                                }`}
                        >
                            <span className={isActive ? "text-primary" : "text-on-surface-variant/60"}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            {hotspot.label}
                        </button>
                    );
                })}
            </div>

            {/* Description panel, bottom — clip-path reveal on select */}
            {active && (
                <div
                    ref={panelRef}
                    className="absolute bottom-0 left-0 right-0 md:right-auto md:w-[420px] m-6 p-8 rounded-3xl bg-surface-container/90 backdrop-blur-xl border border-outline-variant/20"
                >
                    <button
                        onClick={closePanel}
                        aria-label="Close"
                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>

                    <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-primary">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(model.hotspots.length).padStart(2, "0")}
                    </span>
                    <h3 className="font-display-lg text-display-lg-mobile text-on-surface leading-tight mt-2 mb-4">
                        {active.label}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        {active.description}
                    </p>
                </div>
            )}
        </div>
    );
}

useGLTF.preload("/models/basantapur.glb");