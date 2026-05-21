"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUI } from "@/context/UIContext";
import { GalleryItem } from "@/data/galleryData";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import gsap from "gsap";

interface CategoryGalleryOverlayProps {
    categoryName: string;
    items: GalleryItem[];
    onClose: () => void;
}

export default function CategoryGalleryOverlay({
    categoryName,
    items,
    onClose,
}: CategoryGalleryOverlayProps) {
    const { openEnquiry } = useUI();
    const [visibleCount, setVisibleCount] = useState(16);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const overlayRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Disable body scroll when open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    // GSAP Entry Animation
    useEffect(() => {
        if (!overlayRef.current) return;
        
        // Slide up and fade in overlay
        gsap.fromTo(
            overlayRef.current,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        // Stagger grid items entrance slightly
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.2, stagger: 0.03, ease: "power2.out" }
            );
        }
    }, []);

    const handleClose = () => {
        if (!overlayRef.current) {
            onClose();
            return;
        }
        gsap.to(overlayRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: onClose,
        });
    };

    const handleLoadMore = () => {
        const nextCount = Math.min(visibleCount + 16, items.length);
        
        // Temporarily animate newly added items
        const prevCount = visibleCount;
        setVisibleCount(nextCount);

        // Give React a tick to render new items, then animate them in
        setTimeout(() => {
            if (gridRef.current) {
                const newItems = Array.from(gridRef.current.children).slice(prevCount);
                gsap.fromTo(
                    newItems,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "power2.out" }
                );
            }
        }, 50);
    };

    // Lightbox Handlers
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % items.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    };

    const handleLightboxInquire = (e: React.MouseEvent, plantName: string) => {
        e.stopPropagation();
        closeLightbox();
        handleClose();
        // Wait for parent component slide down, then open inquiry modal
        setTimeout(() => {
            openEnquiry(plantName);
        }, 500);
    };

    // Keyboard controls for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex]);

    const visibleItems = items.slice(0, visibleCount);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[60] bg-alabaster flex flex-col w-full h-full overflow-y-auto px-6 md:px-12 py-8 pt-24"
        >
            {/* Gallery Navbar */}
            <div className="flex justify-between items-start border-b border-plantation-green/10 pb-8 mb-12">
                <div>
                    <button
                        onClick={handleClose}
                        className="text-xs uppercase tracking-widest text-plantation-green/60 hover:text-plantation-green mb-4 flex items-center gap-2 group transition-colors cursor-pointer"
                    >
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back to Collections
                    </button>
                    <h2 className="text-5xl font-serif text-plantation-green tracking-wide lowercase">{categoryName}</h2>
                    <p className="text-plantation-green/50 text-sm mt-1 uppercase tracking-widest font-sans font-medium">
                        {items.length} Unique Specimen{items.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <button
                    onClick={handleClose}
                    className="w-12 h-12 rounded-full border border-plantation-green/10 flex items-center justify-center text-plantation-green hover:bg-plantation-green hover:text-alabaster transition-all duration-300 shadow-sm cursor-pointer"
                >
                    <IoClose size={24} />
                </button>
            </div>

            {/* Gallery Image Grid */}
            <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
            >
                {visibleItems.map((item, index) => (
                    <div
                        key={item.path}
                        onClick={() => openLightbox(index)}
                        className="group relative h-[320px] rounded-xl overflow-hidden cursor-pointer shadow-md border border-plantation-green/5 bg-plantation-green flex flex-col justify-end p-6"
                    >
                        <Image
                            src={item.path}
                            alt={item.name}
                            fill
                            loading="lazy"
                            className="object-cover transition-all duration-[800ms] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                        {/* Title and details */}
                        <div className="relative z-10 flex flex-col w-full">
                            <h4 className="text-lg font-serif text-alabaster line-clamp-1 mb-3">
                                {item.name}
                            </h4>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                    setTimeout(() => openEnquiry(item.name), 500);
                                }}
                                className="w-full py-2 bg-alabaster/10 backdrop-blur-md border border-alabaster/20 text-alabaster hover:bg-soft-gold hover:border-soft-gold hover:text-plantation-green rounded-lg text-xs uppercase tracking-widest transition-all duration-300 font-sans font-medium text-center cursor-pointer"
                            >
                                Inquire
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < items.length && (
                <div className="flex justify-center mb-24">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-4 border border-plantation-green/30 text-plantation-green hover:bg-plantation-green hover:text-alabaster hover:border-plantation-green rounded-full uppercase tracking-widest text-xs font-semibold font-sans transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                    >
                        Load More Specimens
                    </button>
                </div>
            )}

            {/* Immersive Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-12 cursor-default"
                    onClick={closeLightbox}
                >
                    {/* Top Row: Info & Close */}
                    <div className="flex justify-between items-center w-full z-10">
                        <div className="text-alabaster/70 text-xs uppercase tracking-widest font-sans font-medium">
                            {lightboxIndex + 1} / {items.length}
                        </div>
                        <button
                            onClick={closeLightbox}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-alabaster flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Middle Row: Image with Navigation */}
                    <div className="relative flex items-center justify-center w-full h-[65vh]">
                        {/* Prev Button */}
                        <button
                            onClick={prevImage}
                            className="absolute left-0 md:left-4 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-alabaster flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                        >
                            <IoChevronBack size={24} />
                        </button>

                        {/* Image */}
                        <div
                            className="relative w-full max-w-4xl h-full flex items-center justify-center p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={items[lightboxIndex].path}
                                alt={items[lightboxIndex].name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextImage}
                            className="absolute right-0 md:right-4 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-alabaster flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                        >
                            <IoChevronForward size={24} />
                        </button>
                    </div>

                    {/* Bottom Row: Text & Inquiry Action */}
                    <div
                        className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto gap-6 z-10 border-t border-white/10 pt-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center md:text-left">
                            <span className="text-xs uppercase tracking-[0.2em] text-soft-gold font-sans font-medium block mb-1">
                                {categoryName} Collection
                            </span>
                            <h3 className="text-2xl md:text-3xl font-serif text-alabaster">
                                {items[lightboxIndex].name}
                            </h3>
                        </div>
                        <button
                            onClick={(e) => handleLightboxInquire(e, items[lightboxIndex].name)}
                            className="px-8 py-4 bg-soft-gold text-plantation-green hover:bg-alabaster rounded-full text-xs uppercase tracking-widest transition-all duration-300 font-sans font-bold shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                        >
                            Inquire About Specimen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
