"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useUI } from "@/context/UIContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "The Gallery", href: "/gallery" },
];

export default function NavBar() {
    const pathname = usePathname();
    const { openEnquiry } = useUI();

    // Routes that start with a dark background (Hero) require Light Text initially
    // Products page starts with dark hero too (thinking green)
    const isDarkHeaderRoute = pathname === "/" || pathname === "/products";

    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const fullScreenMenuRef = useRef<HTMLDivElement>(null);
    const menuTl = useRef<gsap.core.Timeline | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll & Route Visual Logic
    useGSAP(() => {
        const ctx = gsap.context(() => {
            // 1. Initial State based on Route
            if (!isDarkHeaderRoute && !isScrolled) {
                // Light Page (e.g. Services) -> Dark Text
                gsap.set([logoRef.current, ".nav-link", ".menu-btn", ".enquiry-btn"], { color: "#2d3a3a" });
            } else {
                // Dark Page (Home) -> Light Text
                gsap.set([logoRef.current, ".nav-link", ".menu-btn", ".enquiry-btn"], { color: "#f2f0e9" });
            }

            // 2. Mobile Menu Timeline
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
                // Queried off the menu element rather than by selector: the overlay
                // renders outside navRef, so the scoped context can't see it.
                .from(fullScreenMenuRef.current?.querySelectorAll(".mobile-nav-link") ?? [], {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.2");

        }, navRef);
        return () => ctx.revert();
    }, { scope: navRef, dependencies: [pathname, isDarkHeaderRoute] }); // Re-run if route changes

    // Handle Scroll Effects
    useEffect(() => {
        if (!navRef.current) return;

        if (isScrolled) {
            // Scrolled: Glassy Background, Dark Text
            gsap.to(navRef.current, {
                backgroundColor: "rgba(242, 240, 233, 0.95)",
                backdropFilter: "blur(12px)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                duration: 0.4,
                ease: "power2.out",
                borderBottom: "1px solid rgba(45, 58, 58, 0.05)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
            });
            gsap.to([logoRef.current, ".nav-link", ".menu-btn", ".enquiry-btn"], { color: "#2d3a3a", duration: 0.4 });
        } else {
            // Top: Transparent
            gsap.to(navRef.current, {
                backgroundColor: "rgba(242, 240, 233, 0)",
                backdropFilter: "blur(0px)",
                paddingTop: "2rem",
                paddingBottom: "2rem",
                duration: 0.4,
                ease: "power2.out",
                borderBottom: "1px solid rgba(45, 58, 58, 0)",
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
            });

            // Text color depends on route at top
            if (isDarkHeaderRoute) {
                gsap.to([logoRef.current, ".nav-link", ".menu-btn", ".enquiry-btn"], { color: "#f2f0e9", duration: 0.4 });
            } else {
                gsap.to([logoRef.current, ".nav-link", ".menu-btn", ".enquiry-btn"], { color: "#2d3a3a", duration: 0.4 });
            }
        }
    }, [isScrolled, isDarkHeaderRoute]);

    // Handle Menu Toggle
    useEffect(() => {
        if (menuTl.current) {
            if (isMenuOpen) {
                menuTl.current.play();
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
                    className="relative z-50 flex items-center justify-start w-[180px] sm:w-[220px] md:w-[320px] lg:w-[380px] aspect-[10430/822] hover:scale-105 transition-transform duration-300"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <Image
                        src="/logos/rareblom.png"
                        alt="RareBloom Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div ref={linksRef} className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link text-alabaster hover:text-soft-gold transition-colors text-sm uppercase tracking-widest font-sans"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Enquiry Button (Desktop) */}
                    <button
                        onClick={() => openEnquiry()}
                        className="enquiry-btn text-alabaster hover:text-soft-gold transition-colors text-sm uppercase tracking-widest font-sans"
                    >
                        Enquiry
                    </button>
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
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            openEnquiry();
                        }}
                        className="mobile-nav-link text-4xl font-serif text-alabaster hover:text-soft-gold transition-colors"
                    >
                        Enquiry
                    </button>
                </div>
            </div>
        </>
    );
}
