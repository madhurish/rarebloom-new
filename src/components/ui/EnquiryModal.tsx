"use client";

import React, { useEffect, useRef } from "react";
import { useUI } from "@/context/UIContext";
import gsap from "gsap";
import { IoClose } from "react-icons/io5";

export default function EnquiryModal() {
    const { isEnquiryOpen, enquirySubject, closeEnquiry } = useUI();
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [requirements, setRequirements] = React.useState("");

    useEffect(() => {
        if (isEnquiryOpen) {
            setRequirements(enquirySubject ? `I am interested in acquiring the specimen: ${enquirySubject}` : "");
            gsap.to(modalRef.current, {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.2)" }
            );
        } else {
            gsap.to(modalRef.current, {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isEnquiryOpen, enquirySubject]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Enquiry submitted for:", requirements);
        closeEnquiry();
    };

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none p-4"
        >
            <div
                ref={contentRef}
                className="bg-alabaster w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
            >
                <button
                    onClick={closeEnquiry}
                    className="absolute top-4 right-4 text-plantation-green/60 hover:text-terracotta transition-colors"
                >
                    <IoClose size={24} />
                </button>

                <div className="p-8 md:p-10">
                    <h2 className="text-3xl font-serif text-plantation-green mb-2">Get in Touch</h2>
                    <p className="text-plantation-green/70 text-sm mb-8">Tell us about your requirements and we'll help you grow.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-plantation-green/60 mb-2 font-medium">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white border border-plantation-green/10 rounded-lg px-4 py-3 text-plantation-green focus:outline-none focus:border-terracotta transition-colors"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-plantation-green/60 mb-2 font-medium">Contact Details</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white border border-plantation-green/10 rounded-lg px-4 py-3 text-plantation-green focus:outline-none focus:border-terracotta transition-colors"
                                placeholder="Email or Phone Number"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-plantation-green/60 mb-2 font-medium">Product Requirements</label>
                            <textarea
                                required
                                rows={4}
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                className="w-full bg-white border border-plantation-green/10 rounded-lg px-4 py-3 text-plantation-green focus:outline-none focus:border-terracotta transition-colors resize-none"
                                placeholder="Describe what you are looking for..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-terracotta text-white py-4 rounded-lg uppercase tracking-widest text-sm font-medium hover:bg-plantation-green transition-all shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1"
                        >
                            Send Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
