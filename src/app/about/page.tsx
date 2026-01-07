"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".reveal-text", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-alabaster min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-16 items-center about-section">
                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h1 className="text-5xl md:text-7xl font-serif text-plantation-green leading-tight mb-8 reveal-text">
                            Cultivating Nature's <br /> <span className="text-fern-green italic">Masterpieces</span>
                        </h1>

                        <div className="space-y-6 text-lg text-plantation-green/80 font-sans leading-relaxed reveal-text">
                            <p>
                                <strong>Rare Bloom</strong> is a sanctuary for plant enthusiasts, dedicated to the art of horticulture.
                                For decades, we have curated a collection of nature's finest specimens, bringing life and beauty to spaces across the region.
                            </p>
                            <p>
                                From the lush foliage of tropical giants to the delicate blooms of rare orchids, our nursery offers a diverse range of high-quality plants.
                                Sourced responsibly and grown with expert care, each plant tells a story of growth and vitality.
                            </p>
                            <p>
                                Whether you are a seasoned collector or beginning your green journey, our extensive selection of indoor and outdoor varieties ensures there is something perfect for every environment.
                            </p>
                        </div>

                        <div className="mt-12 reveal-text">
                            <MagneticButton>
                                Visit Our Nursery
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mt-12">
                            <Image src="/imgs/p3.jpg" alt="Legacy Image" fill className="object-cover" />
                        </div>
                        <div className="relative h-[300px] w-full rounded-2xl overflow-hidden">
                            <Image src="/imgs/f7.jpg" alt="Legacy Image" fill className="object-cover" />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-plantation-green/10 pt-12">
                    {[
                        { label: "Years of Heritage", value: "10+" },
                        { label: "Plant Varieties", value: "5000+" },
                        { label: "Acres Cultivated", value: "60+" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <h3 className="text-6xl font-serif text-terracotta mb-2">{stat.value}</h3>
                            <p className="text-plantation-green font-sans uppercase tracking-widest text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
