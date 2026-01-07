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
    const [isScrolled, setIsScrolled] = useState(false);

    useGSAP(() => {
        // Initial entrance animation
        const tl = gsap.timeline();

        // Set initial colors based on route
        if (!isDarkHeaderRoute) {
            gsap.set(logoRef.current, { color: "#2d3a3a" });
            gsap.set(".nav-link", { color: "#2d3a3a" });
            gsap.set(".menu-btn", { color: "#2d3a3a" });
        } else {
            gsap.set(logoRef.current, { color: "#f2f0e9" });
            gsap.set(".nav-link", { color: "#f2f0e9" });
            gsap.set(".menu-btn", { color: "#f2f0e9" });
        }

        tl.from(logoRef.current, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
            .from(
                ".nav-link",
                {
                    y: -30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.5"
            );

    }, { scope: navRef, dependencies: [pathname] });

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

    useEffect(() => {
        if (isScrolled) {
            // Scrolled State: Light Glassy Background, Dark Text (ALWAYS, for all pages)
            gsap.to(navRef.current, {
                backgroundColor: "rgba(242, 240, 233, 0.95)", // More opaque for readability
                backdropFilter: "blur(12px)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                duration: 0.4,
                ease: "power2.out",
                borderBottom: "1px solid rgba(45, 58, 58, 0.05)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
            });

            gsap.to(logoRef.current, { color: "#2d3a3a", duration: 0.4 }); // Plantation Green
            gsap.to(".nav-link", { color: "#2d3a3a", duration: 0.4 });
            gsap.to(".menu-btn", { color: "#2d3a3a", duration: 0.4 });

        } else {
            // Top State
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

            if (isDarkHeaderRoute) {
                // Home/Collections: Transparent + Light Text
                gsap.to(logoRef.current, { color: "#f2f0e9", duration: 0.4 }); // Alabaster
                gsap.to(".nav-link", { color: "#f2f0e9", duration: 0.4 });
                gsap.to(".menu-btn", { color: "#f2f0e9", duration: 0.4 });
            } else {
                // Others: Transparent + Dark Text
                gsap.to(logoRef.current, { color: "#2d3a3a", duration: 0.4 });
                gsap.to(".nav-link", { color: "#2d3a3a", duration: 0.4 });
                gsap.to(".menu-btn", { color: "#2d3a3a", duration: 0.4 });
            }
        }
    }, [isScrolled, isDarkHeaderRoute]);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all bg-transparent"
        >
            <Link
                href="/"
                ref={logoRef}
                className="text-2xl md:text-3xl font-serif font-bold text-alabaster tracking-wide"
            >
                Rare Bloom
            </Link>

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

            {/* Mobile Menu Button Placeholder */}
            <div className="md:hidden">
                <button className="menu-btn text-alabaster">Menu</button>
            </div>
        </nav>
    );
}
