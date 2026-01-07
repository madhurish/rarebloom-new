"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import MagneticButton from "@/components/ui/MagneticButton";
import * as THREE from "three";

function FlowerModel({ progress }: { progress: React.MutableRefObject<number> }) {
    const { scene, animations } = useGLTF("/animated_daisy_flower.glb");
    const mixer = useRef<THREE.AnimationMixer>(null);

    useLayoutEffect(() => {

        console.log("Animations found:", animations.length);
        if (animations.length) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(animations[0]);
            action.play();
            // action.paused = false; // Try playing to see if it works at all? No, we want scrub.
        }
    }, [scene, animations]);

    useFrame(() => {
        const p = progress.current; // 0 to 1

        // FREEZE POINT: The animation and rotation will complete at 0.85 
        // and stay there for the remaining scroll.
        const freezePoint = 0.85;
        // Map 0..0.85 to 0..1
        // If p > 0.85, it stays at 1
        const effectiveP = Math.min(p / freezePoint, 1);

        if (mixer.current && animations.length) {
            const clip = mixer.current.clipAction(animations[0]).getClip();
            if (clip) {
                mixer.current.setTime(effectiveP * clip.duration);
            }
        }

        if (scene) {
            // Rotate full 360 (or desired angle) by the freeze point
            scene.rotation.y = effectiveP * Math.PI * 2;
            scene.rotation.x = effectiveP * 0.1;
        }
    });

    return <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, -2.0, 0]} />;
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const progressRef = useRef(0);
    const [titleVisible, setTitleVisible] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", // Long scroll for animation
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    progressRef.current = self.progress;
                    if (self.progress > 0.85 && !titleVisible) {
                        setTitleVisible(true);
                        gsap.to(".hero-title", { opacity: 1, y: 0, duration: 1 });
                    } else if (self.progress < 0.8 && titleVisible) {
                        setTitleVisible(false);
                        gsap.to(".hero-title", { opacity: 0, y: 20, duration: 0.5 });
                    }
                }
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-plantation-green"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img
                    src="/imgs/p5.jpg"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 z-0 bg-black/30" />

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <Environment preset="city" />
                    <FlowerModel progress={progressRef} />
                </Canvas>
            </div>

            {/* Title Overlay (Reveals near end) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none fade-in">
                <div className="hero-title opacity-0 translate-y-10 text-center">
                    <h1 className="text-8xl md:text-9xl font-serif font-bold text-alabaster drop-shadow-lg">
                        Rare Bloom
                    </h1>
                    <p className="mt-6 text-xl text-soft-gold uppercase tracking-widest font-sans">
                        Nature · Art · Legacy
                    </p>

                    <div className="mt-12 pointer-events-auto">
                        <MagneticButton>Continue Journey</MagneticButton>
                    </div>
                </div>
            </div>

            {/* Initial Prompt */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-alabaster/50 text-sm uppercase tracking-widest transition-opacity duration-500 ${titleVisible ? 'opacity-0' : 'opacity-100'}`}>
                Scroll to Bloom
            </div>
        </section>
    );
}

useGLTF.preload("/animated_daisy_flower.glb");
