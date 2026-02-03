"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
    isEnquiryOpen: boolean;
    openEnquiry: () => void;
    closeEnquiry: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    const openEnquiry = () => setIsEnquiryOpen(true);
    const closeEnquiry = () => setIsEnquiryOpen(false);

    return (
        <UIContext.Provider value={{ isEnquiryOpen, openEnquiry, closeEnquiry }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error("useUI must be used within a UIProvider");
    }
    return context;
};
