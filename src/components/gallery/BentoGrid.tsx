"use client";

import React, { useState } from "react";
import { galleryData, categoriesMeta } from "@/data/galleryData";
import GalleryCategoryCard from "@/components/gallery/GalleryCategoryCard";
import CategoryGalleryOverlay from "@/components/gallery/CategoryGalleryOverlay";

export default function BentoGrid() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const activeCategoryMeta = categoriesMeta.find(cat => cat.id === selectedCategoryId);
    const activeCategoryItems = selectedCategoryId ? galleryData[selectedCategoryId] : [];

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
                            onClick={() => setSelectedCategoryId(category.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Immersive Overlay Gallery */}
            {selectedCategoryId && activeCategoryMeta && (
                <CategoryGalleryOverlay
                    categoryName={activeCategoryMeta.name}
                    items={activeCategoryItems}
                    onClose={() => setSelectedCategoryId(null)}
                />
            )}
        </div>
    );
}
