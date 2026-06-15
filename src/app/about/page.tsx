"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";

const services = [
    {
        title: "Garden Development Solutions",
        desc: "We provide comprehensive landscape design support, premium plantings, and installation coordination to transform empty spaces into botanical masterpieces.",
        img: "/imgs/p1.jpg"
    },
    {
        title: "Nursery Consultancy",
        desc: "Our expert horticulturists provide personalized guidance on plant care, growth management, weather resilience, and soil compatibility tailored to your location.",
        img: "/imgs/f6.jpg"
    },
    {
        title: "Bulk Plant Supply",
        desc: "Reliable commercial nursery partner specializing in wholesale supply for massive real estate developments, campus projects, and municipal tree initiatives.",
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
                {/* Intro Section */}
                <div className="flex flex-col md:flex-row gap-16 items-center about-section">
                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h1 className="text-5xl md:text-7xl font-serif text-plantation-green leading-tight mb-8 reveal-text">
                            Cultivating Nature, <br /> <span className="text-fern-green italic">Building Trust</span>
                        </h1>

                        <div className="space-y-6 text-lg text-plantation-green/80 font-sans leading-relaxed reveal-text">
                            <p>
                                For over 15 years, <strong>RareBloom by Sai Venkata Durga Nursery</strong> has been a trusted name in the nursery and landscaping industry. We specialize in supplying a wide range of high-quality plants, trees, flowering plants, ornamental plants, fruit plants, avenue plants, medicinal plants, and landscaping materials to customers across Andhra Pradesh and neighboring North and South regions.
                            </p>
                            <p>
                                With a commitment to quality, reliability, and customer satisfaction, we have successfully served farmers, landscapers, government projects, institutions, real estate developments, and individual garden enthusiasts. Our extensive experience and passion for greenery have helped us build lasting relationships with our clients.
                            </p>
                            <p>
                                As a premier wholesale and retail supplier, we provide vibrant, healthy flora to transform spaces. Establishing our online presence expands our reach from local buyers to nationwide plant lovers, landscapers, and commercial clients, bringing nature closer to your life today.
                            </p>
                        </div>

                        <div className="mt-12 reveal-text">
                            <MagneticButton>
                                Contact Our Experts
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mt-12 shadow-lg">
                            <Image src="/imgs/p3.jpg" alt="Botanical Heritage" fill className="object-cover" />
                        </div>
                        <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/imgs/f7.jpg" alt="Sapling cultivation" fill className="object-cover" />
                        </div>
                    </div>
                </div>

                {/* Services / What We Do Section */}
                <div className="mt-32">
                    <header className="mb-16 text-center max-w-2xl mx-auto">
                        <p className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold">What We Offer</p>
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

                {/* Impact & Heritage Stats Section */}
                <div className="mt-32 border-t border-plantation-green/10 pt-20">
                    <header className="mb-16 text-center max-w-2xl mx-auto">
                        <p className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Our Heritage</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-plantation-green leading-tight">
                            Growing Together
                        </h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                label: "Of Experience",
                                value: "15+ Years",
                                desc: "Cultivating nature and building lasting client relationships since our founding 15 years ago."
                            },
                            {
                                label: "Horticulture",
                                value: "Expert Care",
                                desc: "Every sapling is nurtured using premium soil, organic fertilizers, and sustainable farming practices."
                            },
                            {
                                label: "Botanical Scale",
                                value: "Wide Variety",
                                desc: "From indoor desk plants to massive landscaping trees, managing a diverse inventory to fulfill bulk or retail needs."
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

                {/* Mission, Vision & Why Choose Us Section */}
                <div className="mt-32 border-t border-plantation-green/10 pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Mission & Vision */}
                        <div className="space-y-12">
                            <div>
                                <span className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold block">Our Mission</span>
                                <h3 className="text-3xl font-serif text-plantation-green mb-4">Promoting a Greener Environment</h3>
                                <p className="text-plantation-green/80 leading-relaxed font-sans">
                                    To promote a greener environment by providing healthy, premium-quality plants and professional nursery solutions while ensuring excellent customer service and sustainable growing practices.
                                </p>
                            </div>
                            <div>
                                <span className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold block">Our Vision</span>
                                <h3 className="text-3xl font-serif text-plantation-green mb-4">Contributing to Sustainability</h3>
                                <p className="text-plantation-green/80 leading-relaxed font-sans">
                                    To become one of the most trusted and preferred nursery suppliers in India by contributing to environmental sustainability and helping create beautiful green spaces.
                                </p>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-plantation-green text-alabaster p-10 md:p-12 rounded-3xl shadow-xl flex flex-col justify-center">
                            <span className="text-soft-gold uppercase tracking-[0.2em] mb-4 text-xs font-semibold block">Why Choose Us</span>
                            <h3 className="text-4xl font-serif mb-8 text-alabaster">Rooted in Trust, Growing with Quality</h3>
                            <ul className="space-y-4 font-sans text-alabaster/80 text-sm md:text-base">
                                {[
                                    "15+ Years of Industry Experience",
                                    "Wide Variety of Healthy Plants & Trees",
                                    "Quality Assured Plant Material",
                                    "Bulk Supply Capability for Projects",
                                    "Competitive Pricing & Clear Advice",
                                    "Timely Delivery & Nationwide Shipping",
                                    "Customer-Focused Horticultural Support"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <span className="text-soft-gold text-lg">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
