"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

const navLinks = [
    { name: "The Greenhouse", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "The Gallery", href: "/gallery" },
    { name: "Collections", href: "/collections" },
];

export default function NavBar() {
    const pathname = usePathname();
    // Routes that start with a dark background (Hero) require Light Text initially
    const isDarkHeaderRoute = pathname === "/" || pathname === "/collections";

    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const fullScreenMenuRef = useRef<HTMLDivElement>(null);
    const menuTl = useRef<gsap.core.Timeline | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(() => {
        // Initialize menu timeline
        menuTl.current = gsap.timeline({ paused: true })
            .to(fullScreenMenuRef.current, {
                display: "flex",
                duration: 0
            })
            .to(fullScreenMenuRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power3.inOut"
            })
            .from(".mobile-nav-link", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.2");
    }, { scope: navRef });

    useEffect(() => {
        if (menuTl.current) {
            if (isMenuOpen) {
                menuTl.current.play();
                // Ensure text colors toggle to light/dark depending on design preference for menu
                // For this, we'll force the menu text to be alabaster (light) on a dark plantation-green background
            } else {
                menuTl.current.reverse();
            }
        }
    }, [isMenuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all bg-transparent"
            >
                <Link
                    href="/"
                    ref={logoRef}
                    className="text-2xl md:text-3xl font-serif font-bold text-alabaster tracking-wide relative z-50"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Rare Bloom
                </Link>

                {/* Desktop Menu */}
                <div ref={linksRef} className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link text-alabaster hover:text-soft-gold transition-colors text-sm uppercase tracking-widest font-sans"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden relative z-50">
                    <button
                        className="menu-btn text-alabaster font-sans uppercase tracking-widest text-sm"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </nav>

            {/* Mobile Full Screen Menu Overlay */}
            <div
                ref={fullScreenMenuRef}
                className="fixed inset-0 z-40 bg-plantation-green hidden flex-col justify-center items-center opacity-0"
            >
                <div className="flex flex-col space-y-8 text-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="mobile-nav-link text-4xl font-serif text-alabaster hover:text-soft-gold transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
