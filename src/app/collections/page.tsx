import ParallaxSection from "@/components/collections/ParallaxSection";

export default function CollectionsPage() {
    return (
        <main>
            <section className="h-[40vh] flex items-center justify-center bg-plantation-green">
                <h1 className="text-5xl md:text-7xl font-serif text-alabaster">Thinking Green</h1>
            </section>
            <ParallaxSection />
            <section className="h-[40vh] bg-plantation-green" />
        </main>
    );
}
