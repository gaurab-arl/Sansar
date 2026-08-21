import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Html,
    OrbitControls,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import Hotspot from "./Hotspot";


/* =====================================================
   MODEL
===================================================== */

function PlaceModel({ url }) {
    const { scene } = useGLTF(url);

    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);

        const box = new THREE.Box3().setFromObject(clone);

        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxAxis = Math.max(
            size.x,
            size.y,
            size.z
        );

        const fitScale =
            maxAxis > 0
                ? 1.65 / maxAxis
                : 1;

        clone.position.sub(center);

        clone.position.y += size.y / 2;

        clone.scale.setScalar(fitScale);

        return clone;
    }, [scene]);

    return (
        <primitive
            object={clonedScene}
            dispose={null}
        />
    );
}


/* =====================================================
   LOADING
===================================================== */

function LoadingScreen() {
    return (
        <Html center>

            <div className="flex flex-col items-center gap-4">

                <div
                    className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border
                        border-black/10
                        border-t-black
                    "
                />

                <span
                    className="
                        text-[9px]
                        uppercase
                        tracking-[0.3em]
                        text-black/50
                    "
                >
                    Entering place
                </span>

            </div>

        </Html>
    );
}


/* =====================================================
   SCENE
===================================================== */

export default function DestinationScene({
    destination,
    onSelectHotspot,
    selectedHotspot,
}) {

    const model = destination.model;

    const MODEL_SCALE =
        model.scale ?? 5;


    return (
        <Canvas
            className="!absolute !inset-0"

            camera={{
                position: [4, 3, 6],
                fov: 42,
                near: 0.1,
                far: 1000,
            }}

            /*
             * IMPORTANT FOR YOUR LAPTOP
             */
            dpr={1}

            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
            }}
        >

            {/* =================================================
                LIGHT
            ================================================= */}

            <ambientLight
                intensity={2}
            />

            <directionalLight
                position={[5, 10, 5]}
                intensity={2}
            />


            {/* =================================================
                MODEL
            ================================================= */}

            <group scale={MODEL_SCALE}>

                <Suspense
                    fallback={<LoadingScreen />}
                >

                    <PlaceModel
                        url={model.glbUrl}
                    />


                    {/* =================================================
                        HOTSPOTS
                    ================================================= */}

                    {model.hotspots?.map(
                        (hotspot) => (
                            <Hotspot
                                key={hotspot.id}

                                hotspot={hotspot}

                                isActive={
                                    selectedHotspot?.id ===
                                    hotspot.id
                                }

                                onSelect={
                                    onSelectHotspot
                                }
                            />
                        )
                    )}

                </Suspense>

            </group>


            {/* =================================================
                ORBIT CONTROLS

                THIS IS THE ONLY CAMERA CONTROLLER.
            ================================================= */}

            <OrbitControls
                enableDamping={false}

                enablePan={false}

                rotateSpeed={1.2}

                zoomSpeed={1}

                minDistance={2}

                maxDistance={15}

                minPolarAngle={0.2}

                maxPolarAngle={Math.PI / 2.05}

                target={[0, 0.5, 0]}
            />

        </Canvas>
    );
}


/* =====================================================
   PRELOAD
===================================================== */

useGLTF.preload(
    "/models/basantapur.glb"
);

useGLTF.preload(
    "/models/baktapur.glb"
);

useGLTF.preload(
    "/models/ktm.glb"
);

useGLTF.preload(
    "/models/patan.glb"
);