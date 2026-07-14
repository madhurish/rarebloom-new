"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { categoriesMeta } from "@/data/galleryData";
import GalleryCategoryCard from "@/components/gallery/GalleryCategoryCard";

interface CategoryMeta {
    id: string;
    name: string;
    description: string;
    count: number;
    cover: string;
}

const deletedIndices = new Set([5, 7, 8, 32, 33, 53, 63]);
const malpighiaImages = Array.from({ length: 77 }, (_, i) => i + 1)
    .filter((num) => !deletedIndices.has(num))
    .map((num) => `/gallery/Malpighia Models/Malpighia Models_${num}.jpg`);

export default function BentoGrid() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryMeta | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Reset active index when category changes
    useEffect(() => {
        setActiveImageIndex(0);
    }, [selectedCategory]);

    // Keyboard navigation for carousel
    useEffect(() => {
        if (!selectedCategory || selectedCategory.id !== "malpighia") return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setActiveImageIndex((prev) => (prev + 1) % malpighiaImages.length);
            } else if (e.key === "ArrowLeft") {
                setActiveImageIndex((prev) => (prev - 1 + malpighiaImages.length) % malpighiaImages.length);
            } else if (e.key === "Escape") {
                setSelectedCategory(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-alabaster px-6 md:px-12 py-32">
            <div className="max-w-7xl mx-auto">
                {/* Page Intro Header */}
                <div className="mb-20 text-center md:text-left">
                    <span className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans font-medium block mb-3">
                        Curated Collections
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif text-plantation-green mb-6 tracking-wide lowercase">
                        the gallery
                    </h1>
                    <p className="text-plantation-green/70 text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
                        Explore our botanical legacy. Masterpieces of scale, structure, and character, meticulously cultivated to frame and elevate luxury landscapes.
                    </p>
                </div>

                {/* Categories Grid Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoriesMeta.map((category) => (
                        <GalleryCategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            description={category.description}
                            count={category.count}
                            cover={category.cover}
                            onClick={() => {
                                setSelectedCategory(category);
                                setActiveImageIndex(0);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Beautiful Image Viewer Modal */}
            {selectedCategory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-plantation-green/90 backdrop-blur-md transition-opacity duration-300"
                    onClick={() => setSelectedCategory(null)}
                >
                    <div
                        className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* The Image itself - no shade, no filters */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-alabaster/10 bg-black/45">
                            <Image
                                src={
                                    (selectedCategory.id === "malpighia"
                                        ? (malpighiaImages[activeImageIndex] || malpighiaImages[0])
                                        : selectedCategory.cover) || "/gallery/Malpighia.jpg"
                                }
                                alt={selectedCategory.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Slider Controls for Malpighia */}
                        {selectedCategory.id === "malpighia" && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) => (prev - 1 + malpighiaImages.length) % malpighiaImages.length);
                                    }}
                                    className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-alabaster/10 text-alabaster flex items-center justify-center backdrop-blur-md border border-alabaster/20 hover:bg-terracotta hover:border-terracotta hover:text-white hover:scale-105 transition-all duration-300 shadow-md z-20"
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) => (prev + 1) % malpighiaImages.length);
                                    }}
                                    className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-alabaster/10 text-alabaster flex items-center justify-center backdrop-blur-md border border-alabaster/20 hover:bg-terracotta hover:border-terracotta hover:text-white hover:scale-105 transition-all duration-300 shadow-md z-20"
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Title overlay or label at the bottom of the image viewer */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-alabaster/10 text-alabaster text-xs md:text-sm font-sans tracking-widest uppercase px-6 py-3 rounded-full z-10 select-none shadow-lg whitespace-nowrap flex items-center gap-3">
                            <span>{selectedCategory.name}</span>
                            {selectedCategory.id === "malpighia" && (
                                <>
                                    <span className="text-soft-gold font-bold">|</span>
                                    <span className="text-alabaster/60 font-semibold">{activeImageIndex + 1} / {malpighiaImages.length}</span>
                                </>
                            )}
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="absolute -top-14 right-2 md:-top-16 md:-right-4 w-10 h-10 rounded-full bg-alabaster/10 text-alabaster flex items-center justify-center backdrop-blur-md border border-alabaster/20 hover:bg-terracotta hover:border-terracotta hover:text-white hover:scale-105 transition-all duration-300 shadow-md"
                            aria-label="Close image viewer"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
