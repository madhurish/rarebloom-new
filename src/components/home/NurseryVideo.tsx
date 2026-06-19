"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function NurseryVideo() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(contentRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-plantation-green"
        >
            {/* Background Video */}
            <video
                src="/output_720.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-[1]"
            />

            {/* Gradient Overlay for Cinematic Aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-b from-plantation-green/80 via-black/40 to-plantation-green z-[2]" />

            {/* Text Content Overlay */}
            <div
                ref={contentRef}
                className="relative z-[3] text-center px-6 max-w-4xl flex flex-col items-center justify-center text-alabaster"
            >
                <span className="text-soft-gold uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6">
                    Our Nursery
                </span>
                
                <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight drop-shadow-md">
                    A Living Sanctuary <br />
                    <span className="text-alabaster/90 italic font-normal">of Rare Flora</span>
                </h2>

                <p className="text-lg md:text-xl font-sans text-alabaster/85 leading-relaxed max-w-2xl mb-12 drop-shadow-sm font-light">
                    Spanning across acres of rich, fertile ground, our nursery is home to a meticulously curated collection of exotic trees, ornamental foliage, and specimen plantings. Experience nature, nurtured with fifteen years of absolute care and expertise.
                </p>

                <div>
                    <MagneticButton>
                        Take Virtual Tour
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
