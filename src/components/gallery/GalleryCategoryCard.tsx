"use client";

import React from "react";
import Image from "next/image";
import TiltCard from "@/components/ui/TiltCard";

interface CategoryCardProps {
    id: string;
    name: string;
    description: string;
    count: number;
    cover: string;
    onClick: () => void;
}

export default function GalleryCategoryCard({
    name,
    description,
    count,
    cover,
    onClick,
}: CategoryCardProps) {
    return (
        <div onClick={onClick} className="cursor-pointer group h-full">
            <TiltCard className="h-full">
                <div className="relative h-[450px] w-full rounded-2xl overflow-hidden border border-plantation-green/10 shadow-lg bg-plantation-green transition-shadow duration-500 hover:shadow-2xl flex flex-col justify-end p-8">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={cover}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out scale-100 group-hover:scale-110 opacity-75 group-hover:opacity-90"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Elegant Dark Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/50" />
                    </div>

                    {/* Badge showing specimen count */}
                    <div className="absolute top-6 right-6 bg-alabaster/10 backdrop-blur-md border border-alabaster/20 text-soft-gold text-xs uppercase tracking-widest px-4 py-2 rounded-full font-sans z-10">
                        {count} Specimen{count !== 1 ? "s" : ""}
                    </div>

                    {/* Content Section */}
                    <div className="relative z-10 flex flex-col">
                        <span className="text-xs uppercase tracking-[0.2em] text-soft-gold mb-2 font-sans font-medium">
                            Collection
                        </span>
                        <h3 className="text-3xl font-serif text-alabaster mb-3 transition-transform duration-500 group-hover:translate-x-1">
                            {name}
                        </h3>
                        <p className="text-alabaster/70 text-sm font-sans leading-relaxed line-clamp-2 max-w-md">
                            {description}
                        </p>

                        {/* Visual indicator of interaction */}
                        <div className="mt-6 flex items-center space-x-2 text-xs uppercase tracking-widest text-soft-gold font-sans font-medium opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                            <span>Explore Gallery</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </div>
                    </div>

                    {/* Full screen hover glass glow */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-soft-gold/30 rounded-2xl transition-colors duration-500 pointer-events-none z-20" />
                </div>
            </TiltCard>
        </div>
    );
}
