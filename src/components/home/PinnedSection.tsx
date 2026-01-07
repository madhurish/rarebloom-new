"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedSection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%", // Reduced pinning duration to prevent stuck feeling
                pin: true,
                scrub: 1,
            }
        });

        // Animate text overlay
        tl.fromTo(textRef.current,
            { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1 }
        );

        // Slight zoom on image
        tl.to(".pinned-image", { scale: 1.1, duration: 1 }, 0);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/imgs/p8.jpg"
                    alt="Greenery"
                    fill
                    className="pinned-image object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Centered Text Reveal */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <div ref={textRef} className="clip-text pb-4">
                    <h2 className="text-6xl md:text-8xl font-serif text-alabaster leading-none">
                        Unearth <br /> The Extraordinary
                    </h2>
                    <p className="mt-8 text-xl text-soft-gold font-sans tracking-widest uppercase">
                        Curated for the connoisseur
                    </p>
                </div>
            </div>
        </section>
    );
}
