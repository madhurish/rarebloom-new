"use client";

import React, { useState } from "react";
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

export default function BentoGrid() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryMeta | null>(null);

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
                            onClick={() => setSelectedCategory(category)}
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
                                src={selectedCategory.cover}
                                alt={selectedCategory.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Title overlay or label at the bottom of the image viewer */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-alabaster/10 text-alabaster text-xs md:text-sm font-sans tracking-widest uppercase px-6 py-3 rounded-full z-10 select-none shadow-lg whitespace-nowrap">
                            {selectedCategory.name}
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
