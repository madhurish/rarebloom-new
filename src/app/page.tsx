import Image from "next/image";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/home/Hero";
import NurseryVideo from "@/components/home/NurseryVideo";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import MarqueeSection from "@/components/home/MarqueeSection";
import PinnedSection from "@/components/home/PinnedSection";


import FullScreenCarousel from "@/components/home/FullScreenCarousel";

export default function Home() {
  return (
    <div className="bg-alabaster min-h-screen">
      <Preloader />
      <Hero />
      <NurseryVideo />
      <MarqueeSection />
      <FullScreenCarousel />
      <HorizontalScroll />
      <PinnedSection />
    </div>
  );
}
