"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import clsx from "clsx";

gsap.registerPlugin(Flip);

const items = [
    { id: 1, title: "Midnight Orchid", category: "Orchids", size: "col-span-1 row-span-1", img: "/imgs/f1.jpg" },
    { id: 2, title: "Velvet Rose", category: "Roses", size: "col-span-2 row-span-1", img: "/imgs/f2.jpg" },
    { id: 3, title: "Golden Lily", category: "Lilies", size: "col-span-1 row-span-2", img: "/imgs/f3.jpg" },
    { id: 4, title: "Ghost Cactus", category: "Cacti", size: "col-span-1 row-span-1", img: "/imgs/f4.jpg" },
    { id: 5, title: "Royal Fern", category: "Ferns", size: "col-span-1 row-span-1", img: "/imgs/f5.jpg" },
];

export default function BentoGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleItemClick = (id: number) => {
        // Capture state
        const state = Flip.getState(".bento-item");

        setSelectedId(selectedId === id ? null : id);
    };

    useGSAP(() => {
        // We use a separate formatting function or effect to trigger the Flip
        if (!containerRef.current) return;

        // This is tricky with React state updates. 
        // Usually we capture state BEFORE the update, and animate AFTER.
        // In this simple implementation, we might need to manually manage the 'expanded' class 
        // or use a LayoutEffect if we were changing the DOM structure.

        // For this demo, let's keep it simple: Animate FLIP when 'selectedId' changes
        // But since React re-renders, we lost the state.

        // Correct React + GSAP Flip pattern requires capturing state before render.
        // However, with state changes, it's easier to animate "opening" a detailed view overlay 
        // rather than shuffling the grid itself unless using a specific library.

        // Let's implement an Overlay expansion instead, which is smoother and common in luxury sites.
    }, [selectedId]);


    return (
        <div className="min-h-screen bg-alabaster p-8 pt-32">
            <div className={clsx(
                "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]",
                selectedId ? "opacity-30 pointer-events-none transition-opacity duration-500" : "opacity-100"
            )}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={clsx(
                            "bento-item relative rounded-2xl overflow-hidden cursor-pointer group border border-plantation-green/5",
                            item.size
                        )}
                    >
                        <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-6 left-6 text-alabaster drop-shadow-md">
                            <p className="text-xs uppercase tracking-widest text-soft-gold mb-2">{item.category}</p>
                            <h3 className="text-xl font-serif">{item.title}</h3>
                        </div>

                        {/* ID for Flip matching */}
                        <div className="hidden" data-flip-id={`img-${item.id}`}></div>
                    </div>
                ))}
            </div>

            {/* Detailed Overlay View (Simulated FLIP target) */}
            {selectedId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-plantation-green/90 backdrop-blur-md"
                    onClick={() => setSelectedId(null)}
                >
                    <div
                        className="bg-alabaster w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.filter(i => i.id === selectedId).map(item => (
                            <div key={item.id} className="h-full flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                    <Image src={item.img} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                                    <p className="text-terracotta uppercase tracking-widest mb-4">{item.category}</p>
                                    <h2 className="text-5xl font-serif text-plantation-green mb-8">{item.title}</h2>
                                    <p className="text-plantation-green/70 font-sans leading-relaxed">
                                        A rare specimen cultivated with care. Suitable for indoor environments with indirect light.
                                        This plant brings an air of sophistication to any space.
                                    </p>
                                    <button className="mt-12 px-8 py-4 border border-plantation-green/20 text-plantation-green rounded-full uppercase text-sm hover:bg-plantation-green hover:text-alabaster transition-all self-start">
                                        Inquire
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 text-plantation-green flex items-center justify-center backdrop-blur-md hover:bg-terracotta hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
