import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, useGLTF } from "@react-three/drei";
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
        const maxAxis = Math.max(size.x, size.y, size.z);
        const fitScale = maxAxis > 0 ? 1.65 / maxAxis : 1;

        clone.position.sub(center);
        clone.position.y += size.y / 2;
        clone.scale.setScalar(fitScale);

        clone.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

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
   CAMERA CONTROLLER
===================================================== */

function CameraController({
    progress,
    cameraPath,
    selectedHotspot,
    modelScale,
}) {
    const { camera } = useThree();

    const currentPosition = useMemo(() => new THREE.Vector3(), []);
    const nextPosition = useMemo(() => new THREE.Vector3(), []);
    const currentLookAt = useMemo(() => new THREE.Vector3(), []);
    const nextLookAt = useMemo(() => new THREE.Vector3(), []);
    
    const targetPosition = useMemo(() => new THREE.Vector3(), []);
    const targetLookAt = useMemo(() => new THREE.Vector3(), []);
    const interpolatedLookAt = useMemo(() => new THREE.Vector3(), []);

    useFrame((_, delta) => {
        if (!cameraPath || cameraPath.length < 2) {
            return;
        }

        const scaledProgress = progress * (cameraPath.length - 1);
        const index = Math.min(Math.floor(scaledProgress), cameraPath.length - 2);
        const localProgress = scaledProgress - index;

        const current = cameraPath[index];
        const next = cameraPath[index + 1];

        // 1. Calculate the scroll-based target position and lookAt
        currentPosition.set(current.position[0], current.position[1], current.position[2]);
        nextPosition.set(next.position[0], next.position[1], next.position[2]);

        const smoothProgress = THREE.MathUtils.smoothstep(localProgress, 0, 1);
        targetPosition.lerpVectors(currentPosition, nextPosition, smoothProgress);

        currentLookAt.set(current.lookAt[0], current.lookAt[1], current.lookAt[2]);
        nextLookAt.set(next.lookAt[0], next.lookAt[1], next.lookAt[2]);
        targetLookAt.lerpVectors(currentLookAt, nextLookAt, smoothProgress);

        // 2. If a hotspot is selected, override the targets
        if (selectedHotspot) {
            const hotspotPos = new THREE.Vector3(
                selectedHotspot.position[0],
                selectedHotspot.position[1],
                selectedHotspot.position[2]
            ).multiplyScalar(modelScale);

            // Offset the camera slightly relative to the hotspot
            const offset = new THREE.Vector3(2, 1.5, 2);
            targetPosition.copy(hotspotPos).add(offset);
            targetLookAt.copy(hotspotPos);
        }

        // 3. Smoothly animate the camera towards the final targets
        const smoothStep = 1 - Math.exp(-8 * delta);
        camera.position.lerp(targetPosition, smoothStep);
        interpolatedLookAt.lerp(targetLookAt, smoothStep);
        
        camera.lookAt(interpolatedLookAt);
    });

    return null;
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
    progress,
    onSelectHotspot,
    selectedHotspot,
}) {
    const model = destination.model;
    const MODEL_SCALE = model.scale ?? 5;

    return (
        <Canvas
            className="!absolute !inset-0"
            camera={{
                position:
                    model.cameraPath?.[0]?.position ?? [
                        4,
                        3,
                        6,
                    ],

                fov: 42,

                near: 0.01,

                far: 2000,
            }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true,
            }}
            shadows
        >
            {/* =================================================
          LIGHTING
      ================================================= */}

            <ambientLight intensity={2.2} />

            <directionalLight
                position={[5, 10, 5]}
                intensity={4}
            />

            <directionalLight
                position={[-5, 6, -5]}
                intensity={2}
            />

            <directionalLight
                position={[0, 3, 10]}
                intensity={1}
            />

            {/* =================================================
          CAMERA
      ================================================= */}

            <CameraController
                progress={progress}
                cameraPath={model.cameraPath}
                selectedHotspot={selectedHotspot}
                modelScale={MODEL_SCALE}
            />

            {/* =================================================
          WORLD

          Model + hotspots are inside the same scaled
          group so their coordinates stay synchronized.
      ================================================= */}

            <group scale={MODEL_SCALE}>
                <Suspense fallback={<LoadingScreen />}>
                    {/* MODEL */}

                    <PlaceModel
                        url={model.glbUrl}
                    />

                    {/* HOTSPOTS */}

                    {model.hotspots?.map((hotspot) => (
                        <Hotspot
                            key={hotspot.id}
                            hotspot={hotspot}
                            isActive={selectedHotspot?.id === hotspot.id}
                            onSelect={onSelectHotspot}
                        />
                    ))}
                </Suspense>
            </group>

            <ContactShadows
                position={[0, -0.02, 0]}
                opacity={0.28}
                scale={14}
                blur={2.4}
                far={8}
            />

            <Environment preset="sunset" />
        </Canvas>
    );
}

useGLTF.preload("/models/basantapur.glb");
useGLTF.preload("/models/baktapur.glb");
useGLTF.preload("/models/ktm.glb");
useGLTF.preload("/models/patan.glb");
