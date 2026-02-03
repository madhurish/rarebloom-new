import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import SmoothScroller from "@/components/layout/SmoothScroller";
import { UIProvider } from "@/context/UIContext";
import EnquiryModal from "@/components/ui/EnquiryModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rarebloom",
  description: "Cultivating Nature's Masterpieces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-alabaster text-plantation-green overflow-x-hidden`}
      >
        <UIProvider>
          <SmoothScroller>
            <NavBar />
            {children}
            <Footer />
            <EnquiryModal />
            <WhatsAppButton />
          </SmoothScroller>
        </UIProvider>
      </body>
    </html>
  );
}
