"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
                <header className="mb-20 text-center max-w-2xl mx-auto">
                    <p className="text-terracotta uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Beyond Plants</p>
                    <h1 className="text-5xl md:text-6xl font-serif text-plantation-green leading-tight">
                        Sharing Knowledge & <br /> Serving Community
                    </h1>
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

                <div className="mt-32 p-12 bg-plantation-green rounded-3xl text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-serif text-alabaster mb-6">Start Your Green Journey</h2>
                        <button className="px-8 py-4 bg-terracotta text-white rounded-full uppercase tracking-widest text-sm hover:bg-white hover:text-terracotta transition-all">
                            Contact Us
                        </button>
                    </div>
                    {/* Decorative Background Opacity */}
                    <div className="absolute inset-0 opacity-10">
                        <Image src="/imgs/f9.jpg" alt="Background" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
