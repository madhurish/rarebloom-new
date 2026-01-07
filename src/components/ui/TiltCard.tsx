"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const card = ref.current;
        if (!card) return;

        const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" });
        const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / (width / 2); // -1 to 1
            const y = (e.clientY - top - height / 2) / (height / 2); // -1 to 1

            // Tilt intensity
            xTo(x * 10);
            yTo(-y * 10);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: ref });

    return (
        <div ref={ref} className={`perspective-1000 ${className}`} style={{ transformStyle: "preserve-3d" }}>
            {children}
        </div>
    );
}
