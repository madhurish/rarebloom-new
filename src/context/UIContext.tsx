"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
    isEnquiryOpen: boolean;
    enquirySubject: string;
    openEnquiry: (subject?: string) => void;
    closeEnquiry: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [enquirySubject, setEnquirySubject] = useState("");

    const openEnquiry = (subject?: string) => {
        setEnquirySubject(subject || "");
        setIsEnquiryOpen(true);
    };

    const closeEnquiry = () => {
        setIsEnquiryOpen(false);
        setEnquirySubject("");
    };

    return (
        <UIContext.Provider value={{ isEnquiryOpen, enquirySubject, openEnquiry, closeEnquiry }}>
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
