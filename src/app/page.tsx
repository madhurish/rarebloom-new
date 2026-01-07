import Image from "next/image";
import Hero from "@/components/home/Hero";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import MarqueeSection from "@/components/home/MarqueeSection";
import PinnedSection from "@/components/home/PinnedSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";

export default function Home() {
  return (
    <div className="bg-alabaster min-h-screen">
      <Hero />
      <MarqueeSection />
      <HorizontalScroll />
      <PinnedSection />
      <FeaturedCategories />
    </div>
  );
}
