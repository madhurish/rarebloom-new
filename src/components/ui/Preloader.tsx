"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
    const { progress } = useProgress();
    const [finished, setFinished] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const percentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Wait for 100% progress + a small delay to ensure smooth exit
        if (progress === 100) {
            const timer = setTimeout(() => {
                setFinished(true);
            }, 500); // 500ms minimum display time after load
            return () => clearTimeout(timer);
        }
    }, [progress]);

    useEffect(() => {
        if (finished && containerRef.current) {
            const tl = gsap.timeline();

            // Exit Animation
            tl.to([textRef.current, percentRef.current], {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in"
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power3.inOut"
                })
                .set(containerRef.current, { display: "none" });
        }
    }, [finished]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-plantation-green flex flex-col items-center justify-center text-alabaster"
        >
            <div
                ref={textRef}
                className="relative w-[320px] h-[240px] mb-8"
            >
                <Image
                    src="/logos/full-logo.png"
                    alt="RareBloom Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <div
                ref={percentRef}
                className="font-sans text-sm uppercase tracking-widest opacity-60"
            >
                {Math.round(progress)}%
            </div>
        </div>
    );
}
