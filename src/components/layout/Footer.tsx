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
                    <address className="not-italic text-alabaster/70 font-sans leading-relaxed">
                        <p>Burrilanka Road, Kadiyam,</p>
                        <p>East Godavari District,</p>
                        <p>Andhra Pradesh, 533126</p>
                        <p>India</p>
                    </address>
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

                    <div className="mt-8">
                        <p className="text-xs text-alabaster/30 uppercase tracking-widest">
                            © {new Date().getFullYear()} Rare Bloom. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
