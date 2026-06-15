"use client";

import React, { useRef } from "react";
import ParallaxSection from "@/components/collections/ParallaxSection";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";

const productDetails = [
    {
        title: "Indoor & Air-Purifying Plants",
        description: "Snake plants, ZZ plants, money plants, and elegant ferns for homes or offices to bring health and freshness indoors.",
        image: "/imgs/p2.jpg"
    },
    {
        title: "Flowering & Ornamental Plants",
        description: "Vibrant roses, hibiscus, jasmine, and seasonal blooms to add rich colors and elegant aesthetics to your gardens.",
        image: "/imgs/f4.jpg"
    },
    {
        title: "Fruit & Culinary Plants",
        description: "High-yield mango, lemon, guava, and organic culinary/herbal plants like tulsi or mint for fresh home harvests.",
        image: "/imgs/f1.jpg"
    },
    {
        title: "Avenue & Landscaping Trees",
        description: "Large shade-giving trees, decorative palms, and boundary hedging plants perfect for commercial and infrastructure projects.",
        image: "/imgs/p7.jpg"
    },
    {
        title: "Gardening Essentials",
        description: "Premium potting mixes, organic fertilizers, durable planters, and basic gardening tools to support healthy growth.",
        image: "/imgs/p5.jpg"
    }
];

export default function ProductsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".product-detail-card", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".product-details-grid",
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-alabaster">
            {/* Header Section */}
            <section className="h-[60vh] flex flex-col items-center justify-center bg-plantation-green text-center px-4">
                <h1 className="text-5xl md:text-7xl font-serif text-alabaster mb-6">Our Collections</h1>
                <p className="text-soft-gold text-lg max-w-2xl font-sans tracking-wide">
                    Discover our curated selection of nature's finest. From rare blooms to majestic trees.
                </p>
            </section>

            {/* Collections Parallax (Existing Content) */}
            <div className="bg-plantation-green pb-20">
                <ParallaxSection />
            </div>

            {/* New Product Details Section */}
            <section className="py-24 px-6 md:px-12 bg-alabaster">
                <div className="container mx-auto">
                    <header className="mb-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-serif text-plantation-green mb-4">Product Categories</h2>
                        <div className="h-1 w-20 bg-terracotta mx-auto" />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 product-details-grid">
                        {productDetails.map((product, i) => (
                            <div key={i} className="product-detail-card group cursor-pointer">
                                <div className="relative h-[350px] w-full rounded-2xl overflow-hidden mb-8">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <h3 className="text-2xl font-serif text-plantation-green mb-3">{product.title}</h3>
                                <p className="text-plantation-green/70 leading-relaxed mb-6">
                                    {product.description}
                                </p>
                                <MagneticButton>View Details</MagneticButton>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
