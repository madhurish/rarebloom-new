"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(textRef.current, { xPercent: xPercent });
            xPercent += 0.1 * direction;
            requestAnimationFrame(animate);
        };

        // Use ScrollTrigger to influence speed/direction if desired, 
        // but for simple continuous marquee, RAF is efficiently enough.
        // Let's add scroll velocity influence for "bells and whistles".

        gsap.to(textRef.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: 0.25,
                onUpdate: e => (direction = e.direction * -1) // Reverse on scroll up
            },
            x: "-=300px", // Slight extra push
        });

        requestAnimationFrame(animate);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden bg-plantation-green py-8 md:py-16">
            <div ref={textRef} className="flex whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                    <h2 key={i} className="text-[10vw] font-serif italic text-alabaster/10 pr-12 uppercase">
                        Rare • Exotic • Sustainable • Timeless •
                    </h2>
                ))}
            </div>
        </div>
    );
}
