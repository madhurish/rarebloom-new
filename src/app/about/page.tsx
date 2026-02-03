"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";

const services = [
    {
        title: "Educational Training",
        desc: "We offer specialized training programs for nursery management, grafting techniques, and plant care for enthusiasts and professionals alike.",
        img: "/imgs/p1.jpg"
    },
    {
        title: "Students' Study Tour",
        desc: "We welcome educational visits from schools and colleges, providing students with hands-on experience in understanding plant biodiversity.",
        img: "/imgs/f6.jpg"
    },
    {
        title: "Government Partnerships",
        desc: "Official partners for various government department training programs, contributing to the nation's green initiatives.",
        img: "/imgs/p8.jpg"
    }
];

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

        gsap.from(".service-card", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 75%",
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

                {/* Services / What We Do Section (Moved from Services Page) */}
                <div className="mt-32">
                    <header className="mb-16 text-center max-w-2xl mx-auto">
                        <p className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Beyond Plants</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-plantation-green leading-tight">
                            Sharing Knowledge & <br /> Serving Community
                        </h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 services-grid">
                        {services.map((service, i) => (
                            <div key={i} className="service-card group cursor-pointer">
                                <div className="relative h-[300px] w-full rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src={service.img}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-plantation-green/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <h3 className="text-2xl font-serif text-plantation-green mb-3 group-hover:text-fern-green transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-plantation-green/70 leading-relaxed text-sm">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact & Heritage Section (Moved from Hero & Enhanced) */}
                <div className="mt-32 border-t border-plantation-green/10 pt-20">
                    <header className="mb-16 text-center max-w-2xl mx-auto">
                        <p className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Our Journey</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-plantation-green leading-tight">
                            Growing Together
                        </h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                label: "Operating for",
                                value: "25 Years",
                                desc: "A legacy of cultivation and care, serving our community with dedication."
                            },
                            {
                                label: "Livelihood for",
                                value: "150+ People",
                                desc: "Empowering local families and fostering a community of skilled horticulturists."
                            },
                            {
                                label: "Expanded to",
                                value: "60+ Acres",
                                desc: "Started from a single acre, now a vast sanctuary of biodiversity."
                            },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group border border-plantation-green/5">
                                <h3 className="text-5xl font-serif text-terracotta mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">{stat.value}</h3>
                                <p className="text-plantation-green font-sans uppercase tracking-widest text-xs font-bold mb-4">{stat.label}</p>
                                <p className="text-plantation-green/70 text-sm leading-relaxed">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
