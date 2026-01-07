"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const col1 = [
    "/imgs/f6.jpg",
    "/imgs/f7.jpg",
    "/imgs/f8.jpg",
];

const col2 = [
    "/imgs/p7.jpg",
    "/imgs/p8.jpg",
    "/imgs/p9.jpg",
];

export default function ParallaxSection() {
    const containerRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Parallax Effect: Move columns at different speeds/directions

        // Left Column moves slightly slower/up
        gsap.to(leftColRef.current, {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        // Right Column moves faster/up
        gsap.to(rightColRef.current, {
            y: -300,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-[150vh] bg-alabaster relative overflow-hidden flex justify-center py-32">
            <div className="container mx-auto px-4 flex gap-8 md:gap-16 justify-center">
                <div ref={leftColRef} className="flex flex-col gap-16 w-full md:w-5/12 pt-0">
                    {col1.map((src, i) => (
                        <div key={i} className="relative aspect-[3/4] w-full rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                            <Image src={src} alt="Collection Item" fill className="object-cover" />
                        </div>
                    ))}
                </div>

                <div ref={rightColRef} className="flex flex-col gap-16 w-full md:w-5/12 pt-32">
                    {col2.map((src, i) => (
                        <div key={i} className="relative aspect-[3/4] w-full rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                            <Image src={src} alt="Collection Item" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none mix-blend-difference">
                <h2 className="text-9xl md:text-[12rem] font-serif text-alabaster/80 opacity-60 whitespace-nowrap">
                    Fruits & Flora
                </h2>
            </div>
        </section>
    );
}
