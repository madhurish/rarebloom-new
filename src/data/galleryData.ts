export interface GalleryItem {
    name: string;
    path: string;
}

export interface GalleryData {
    [category: string]: GalleryItem[];
}

export const galleryData: GalleryData = {};

export const categoriesMeta = [
    {
        id: "avenue_trees",
        name: "Avenue Trees",
        description: "Grand ornamental trees that frame driveways, boundaries, and statements.",
        count: 82,
        cover: "/gallery/Avenue Trees.jpg"
    },
    {
        id: "bamboo",
        name: "Bamboo",
        description: "Versatile, structural screening elements in gold, black, blue, and green.",
        count: 14,
        cover: "/gallery/Bamboo.jpg"
    },
    {
        id: "bougainvillea",
        name: "Bougainvillea",
        description: "Vibrant, cascading bursts of color in architectural forms.",
        count: 24,
        cover: "/gallery/Bougainvillea.jpg"
    },
    {
        id: "climbers",
        name: "Climbers",
        description: "Sculptural climbing vines designed to cover walls, pergolas, and trellises.",
        count: 18,
        cover: "/gallery/Climbers.jpg"
    },
    {
        id: "ficus",
        name: "Ficus",
        description: "Diverse structural foliage and statement trees of scale and presence.",
        count: 35,
        cover: "/gallery/Ficus.jpg"
    },
    {
        id: "fruit_plants",
        name: "Fruit Plants",
        description: "High-yielding and exotic orchard plants grown for home gardens.",
        count: 28,
        cover: "/gallery/Fruit Plants.jpg"
    },
    {
        id: "ground_covers",
        name: "Ground Covers",
        description: "Low-growing foliage that carpets the soil with texture and color.",
        count: 42,
        cover: "/gallery/Ground Covers.jpg"
    },
    {
        id: "heliconia",
        name: "Heliconia",
        description: "Exotic tropical blooms with architectural stems and vivid colors.",
        count: 15,
        cover: "/gallery/Heliconia.jpg"
    },
    {
        id: "imported_plants",
        name: "Imported Plants",
        description: "Rare and handpicked specimens sourced from elite nurseries worldwide.",
        count: 22,
        cover: "/gallery/Imported Plants.jpg"
    },
    {
        id: "indoor_plants",
        name: "Indoor Plants",
        description: "Lush, air-purifying foliage suited for elegant interior spaces.",
        count: 50,
        cover: "/gallery/Indoor Plants.jpg"
    },
    {
        id: "lily",
        name: "Lily",
        description: "Elegant flowering lilies that add grace and fragrance to water features and borders.",
        count: 16,
        cover: "/gallery/Lily.jpg"
    },
    {
        id: "malpighia",
        name: "Malpighia",
        description: "Meticulously shaped dwarf shrubs and compact statement specimens.",
        count: 77,
        cover: "/gallery/Malpighia.jpg"
    },
    {
        id: "medicinal_plants",
        name: "Medicinal Plants",
        description: "Curated selection of therapeutic herbs and traditional plants.",
        count: 30,
        cover: "/gallery/Medicinal Plants.jpg"
    },
    {
        id: "mexican_grass",
        name: "Mexican Grass",
        description: "Premium carpet grass for lush, pristine lawns.",
        count: 8,
        cover: "/gallery/Mexican Grass.jpg"
    },
    {
        id: "palm_varieties",
        name: "Palm Varieties",
        description: "Exotic and tropical palms, adding structural presence and resort-like luxury.",
        count: 42,
        cover: "/gallery/Palm Varieties.jpg"
    },
    {
        id: "plumeria",
        name: "Plumeria",
        description: "Fragrant, sculptural flowering trees that symbolize tropical serenity.",
        count: 20,
        cover: "/gallery/Plumeria.jpg"
    },
    {
        id: "shrubs",
        name: "Shrubs",
        description: "Versatile structural plants for hedges, borders, and garden styling.",
        count: 48,
        cover: "/gallery/Shrubs.jpg"
    }
];
