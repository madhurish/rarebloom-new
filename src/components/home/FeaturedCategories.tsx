"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const categories = [
    { name: "Orchids", img: "/imgs/f1.jpg" },
    { name: "Aroids", img: "/imgs/p1.jpg" },
    { name: "Succulents", img: "/imgs/f4.jpg" },
    { name: "Ferns", img: "/imgs/f5.jpg" },
    { name: "Bonsai", img: "/imgs/p3.jpg" },
];

export default function FeaturedCategories() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeImg, setActiveImg] = useState(categories[0].img);
    const [isActive, setIsActive] = useState(false);

    useGSAP(() => {
        const xTo = gsap.quickTo(cursorRef.current, "left", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "top", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            xTo(clientX);
            yTo(clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-alabaster py-32 relative cursor-none">

            {/* Floating Cursor/Image Preview */}
            <div
                ref={cursorRef}
                className={`fixed w-[300px] h-[400px] rounded-2xl overflow-hidden pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
            >
                <Image
                    src={activeImg}
                    alt="Preview"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-sm font-sans uppercase tracking-[0.2em] text-terracotta mb-12">Our Collections</h2>

                <div className="flex flex-col">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => {
                                setActiveImg(cat.img);
                                setIsActive(true);
                            }}
                            onMouseLeave={() => setIsActive(false)}
                            className="group relative border-t border-plantation-green/20 py-12 flex justify-between items-center transition-colors hover:bg-plantation-green/5"
                        >
                            <h3 className="text-5xl md:text-8xl font-serif text-plantation-green group-hover:italic transition-all duration-300 group-hover:ml-12">
                                {cat.name}
                            </h3>
                            <span className="text-lg font-sans text-plantation-green/50 group-hover:text-plantation-green transition-colors">
                                (0{i + 1})
                            </span>
                        </div>
                    ))}
                    <div className="border-t border-plantation-green/20" />
                </div>
            </div>
        </section>
    );
}
