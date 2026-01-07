"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useScroll, ScrollControls, Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

function FlowerModel({ onLoadComplete }: { onLoadComplete: () => void }) {
    const { nodes, materials, scene } = useGLTF("/animated_daisy_flower.glb");
    const scroll = useScroll();
    const modelRef = useRef<THREE.Group>(null);
    const mixer = useRef<THREE.AnimationMixer>(null);

    useLayoutEffect(() => {
        if (scene) {
            // Center the model
            new THREE.Box3().setFromObject(scene).getCenter(scene.position).multiplyScalar(-1);
        }

        // Setup animation mixer if animations exist
        const gltf = useGLTF("/animated_daisy_flower.glb") as any;
        if (gltf.animations.length) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(gltf.animations[0]);
            action.play();
            action.paused = true; // Pause to control via scroll
        }

        onLoadComplete();
    }, [scene]);

    useFrame((state, delta) => {
        // Rotation on scroll
        if (modelRef.current) {
            // Rotate continuously + scroll influence
            modelRef.current.rotation.y = scroll.offset * Math.PI * 2;
            modelRef.current.rotation.x = scroll.offset * 0.2;
        }

        // Animation scrubbing
        if (mixer.current) {
            // Map scroll offset (0 to 1) to animation duration
            const duration = mixer.current.clipAction((useGLTF("/animated_daisy_flower.glb") as any).animations[0]).getClip().duration;
            mixer.current.setTime(scroll.offset * duration);
        }
    });

    return (
        <group ref={modelRef} dispose={null} scale={[2, 2, 2]}> {/* Initial scale adjustments */}
            <primitive object={scene} />
        </group>
    );
}

export default function Scene3D({ onScrollEnd }: { onScrollEnd: () => void }) {
    const isLoaded = useRef(false);

    return (
        <div className="w-full h-screen absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <Environment preset="city" />

                <ScrollControls pages={3} damping={0.2} style={{ width: '100%', height: '100vh' }}>
                    {/* 
                        We need a way to detect scroll end from R3F to React State/DOM.
                        However, ScrollControls handles the scroll internally.
                        We can use a component inside to monitor scroll.
                     */}
                    <ScrollMonitor onScrollEnd={onScrollEnd} />
                    <FlowerModel onLoadComplete={() => isLoaded.current = true} />
                </ScrollControls>
            </Canvas>
        </div>
    );
}

function ScrollMonitor({ onScrollEnd }: { onScrollEnd: () => void }) {
    const scroll = useScroll();
    const triggered = useRef(false);

    useFrame(() => {
        if (scroll.offset > 0.95 && !triggered.current) {
            triggered.current = true;
            onScrollEnd();
        } else if (scroll.offset < 0.9) {
            triggered.current = false; // Reset if scrolled back up
        }
    });

    return null;
}

useGLTF.preload("/animated_daisy_flower.glb");
