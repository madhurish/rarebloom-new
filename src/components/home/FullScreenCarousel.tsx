"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const images = [
    "/imgs/f1.jpg",
    "/imgs/f2.jpg",
    "/imgs/f3.jpg",
    "/imgs/f4.jpg",
    "/imgs/f5.jpg",
];

export default function FullScreenCarousel() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Improved approach for smoother transitions and mixed control (scroll + buttons):
    // If user clicks button, we should scroll to that position.
    // So we need a way to scrollTo a specific progress.

    const scrollToSlide = (index: number) => {
        if (!wrapperRef.current) return;
        const st = ScrollTrigger.getById("carousel-st");
        if (st) {
            // Calculate progress for the target slide
            const progress = index / (images.length - 1);
            // Calculate scroll position
            // Trigger is the wrapper. 
            // Wrapper height is 400vh. Scroll distance is wrapper height - window height? 
            // Trigger start "top top", end "bottom bottom".
            // Scroll distance available is st.end - st.start.
            // But we need to be careful. The trigger is the wrapper.
            // When trigger is at 'top top', progress 0.
            // When trigger is at 'bottom bottom', progress 1.
            const scrollPos = st.start + (st.end as number - st.start) * progress;
            gsap.to(window, { scrollTo: scrollPos, duration: 1, ease: "power2.inOut" });
        }
    };

    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        scrollToSlide(newIndex);
    };

    const nextSlide = () => {
        const newIndex = currentIndex === images.length - 1 ? images.length - 1 : currentIndex + 1;
        scrollToSlide(newIndex);
    };

    useGSAP(() => {
        const st = ScrollTrigger.create({
            id: "carousel-st",
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            snap: {
                snapTo: 1 / (images.length - 1),
                duration: { min: 0.2, max: 0.5 },
                delay: 0.1,
                ease: "power1.inOut"
            },
            onUpdate: (self) => {
                const newIndex = Math.round(self.progress * (images.length - 1));
                setCurrentIndex((prev) => (prev !== newIndex ? newIndex : prev));
            }
        });

        return () => {
            st.kill();
        };
    }, { scope: wrapperRef });

    return (
        <div ref={wrapperRef} className="relative w-full h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {images.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            quality={100}
                        />
                    </div>
                ))}

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 text-white hover:bg-white/10 rounded-full transition-all ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"}`}
                    disabled={currentIndex === 0}
                    aria-label="Previous Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 text-white hover:bg-white/10 rounded-full transition-all ${currentIndex === images.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100"}`}
                    disabled={currentIndex === images.length - 1}
                    aria-label="Next Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? "bg-white" : "bg-white/50"
                                }`}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
