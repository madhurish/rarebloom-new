"use client";

import React from "react";

export default function ModelPlaceholder({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center border border-dashed border-white/20 bg-white/5 rounded-lg p-8 ${className}`}>
            <div className="text-center">
                <p className="text-muted-gold font-serif text-xl mb-2">3D Model View</p>
                <p className="text-soft-cream/50 text-sm font-sans">[ Future R3F Integration ]</p>
            </div>
        </div>
    );
}
