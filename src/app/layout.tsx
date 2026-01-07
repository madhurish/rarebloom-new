import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rare Bloom | Luxury Plants",
  description: "A curated collection of rare and exotic plants.",
};

import SmoothScroller from "@/components/layout/SmoothScroller";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-alabaster text-plantation-green`}
      >
        <SmoothScroller>
          <NavBar />
          {children}
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
