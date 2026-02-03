import Image from "next/image";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/home/Hero";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import MarqueeSection from "@/components/home/MarqueeSection";
import PinnedSection from "@/components/home/PinnedSection";


import FullScreenCarousel from "@/components/home/FullScreenCarousel";

export default function Home() {
  return (
    <div className="bg-alabaster min-h-screen">
      <Preloader />
      <Hero />
      <MarqueeSection />
      <FullScreenCarousel />
      <HorizontalScroll />
      <PinnedSection />
    </div>
  );
}
