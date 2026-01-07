"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MagneticButton({
    children,
    onClick
}: {
    children: React.ReactNode;
    onClick?: () => void
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        // Optional: Animate text separately for more depth
        // const textXTo = gsap.quickTo(textRef.current, "x", { duration: 0.5, ease: "power2.out" });
        // const textYTo = gsap.quickTo(textRef.current, "y", { duration: 0.5, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2); // Corrected Y calc

            // Magnetic strength
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: buttonRef });

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className="relative px-8 py-4 rounded-full border border-alabaster text-alabaster uppercase tracking-widest text-sm  overflow-hidden group hover:text-plantation-green transition-colors duration-300"
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-alabaster translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        </button>
    );
}
