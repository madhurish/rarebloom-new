"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const plants = [
    { id: 1, name: "Monstera Albo", price: "$450", image: "/imgs/p1.jpg" },
    { id: 2, name: "Philodendron Pink", price: "$120", image: "/imgs/p2.jpg" },
    { id: 3, name: "Anthurium Clarinervium", price: "$280", image: "/imgs/p3.jpg" },
    { id: 4, name: "Alocasia Dragon Scale", price: "$95", image: "/imgs/p4.jpg" },
    { id: 5, name: "Begonia Maculata", price: "$65", image: "/imgs/p6.jpg" },
];

export default function HorizontalScroll() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const totalWidth = triggerRef.current!.scrollWidth;
        const windowWidth = window.innerWidth;

        gsap.to(triggerRef.current, {
            x: () => -(totalWidth - windowWidth),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${totalWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true, // debug
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="h-screen overflow-hidden bg-alabaster relative">
            <div
                ref={triggerRef}
                className="flex h-full items-center pl-[10vw] pr-[10vw]"
                style={{ width: "max-content" }}
            >
                <div className="bg-transparent w-96 shrink-0 mr-24">
                    <h2 className="text-6xl font-serif text-plantation-green leading-tight">
                        A Legacy <br /> of Growth
                    </h2>
                    <p className="mt-6 text-plantation-green/70 font-sans max-w-xs">
                        From a humble 50 cents of land to a national landmark in Kadiyam.
                    </p>
                </div>

                {plants.map((plant) => (
                    <div key={plant.id} className="relative w-[400px] h-[600px] shrink-0 mr-16 group">
                        <div className="w-full h-full relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 ease-out shadow-lg">
                            <Image
                                src={plant.image}
                                alt={plant.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-plantation-green/10 group-hover:bg-transparent transition-all duration-500" />
                        </div>

                        <div className="absolute -bottom-12 left-0 w-full flex justify-between items-baseline opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <h3 className="text-2xl font-serif text-plantation-green">{plant.name}</h3>
                            <span className="text-terracotta font-sans tracking-wide">{plant.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
