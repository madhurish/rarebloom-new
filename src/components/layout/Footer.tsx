"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-plantation-green text-alabaster py-20 px-6 md:px-12 border-t border-alabaster/10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between gap-12">

                {/* Brand & Address */}
                <div className="md:w-1/3">
                    <div className="relative w-48 h-12 mb-6">
                        <Image
                            src="/logos/textlogo.png"
                            alt="RareBloom"
                            fill
                            className="object-contain brightness-0 invert"
                        />
                    </div>
                    <address className="not-italic text-alabaster/70 font-sans leading-relaxed mb-6">
                        <p>Burrilanka Road, Kadiyam,</p>
                        <p>East Godavari District,</p>
                        <p>Andhra Pradesh, 533126</p>
                        <p>India</p>
                    </address>
                    <div className="text-xs uppercase tracking-widest text-alabaster/40 font-sans space-y-1">
                        <p>Govt. License Regd. No. 06/2019</p>
                        <p>Ina Regd. No. 2845</p>
                    </div>
                </div>

                {/* Links */}
                <div className="md:w-1/3 flex flex-col gap-4">
                    <h3 className="text-terracotta uppercase tracking-wide text-sm font-semibold mb-2">Navigation</h3>
                    <Link href="/" className="hover:text-terracotta transition-colors w-fit">Home</Link>
                    <Link href="/about" className="hover:text-terracotta transition-colors w-fit">About</Link>
                    <Link href="/products" className="hover:text-terracotta transition-colors w-fit">Products</Link>
                    <Link href="/gallery" className="hover:text-terracotta transition-colors w-fit">Gallery</Link>
                </div>

                {/* Contact */}
                <div className="md:w-1/3">
                    <h3 className="text-terracotta uppercase tracking-wide text-sm font-semibold mb-4">Contact</h3>
                    <p className="text-alabaster/70 mb-2">
                        <a href="mailto:hello@rarebloom.in" className="hover:text-white transition-colors">hello@rarebloom.in</a>
                    </p>
                    <p className="text-alabaster/70">
                        <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto mt-16 pt-8 border-t border-alabaster/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs text-alabaster/40 uppercase tracking-widest">
                    © {new Date().getFullYear()} RareBloom by Sai Venkata Durga Nursery. All rights reserved.
                </p>
                <div className="text-xs font-sans tracking-widest uppercase text-alabaster/60 flex items-center gap-2">
                    <span>Designed & Developed by</span>
                    <a
                        href="https://wishcoinmedia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-soft-gold hover:text-terracotta transition-all duration-300 font-bold border-b border-soft-gold/30 hover:border-terracotta pb-0.5 hover:scale-105"
                    >
                        wishcoinmedia
                    </a>
                </div>
            </div>
        </footer>
    );
}
