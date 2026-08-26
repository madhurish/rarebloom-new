import { galleryImages } from "./galleryImages";

export interface GalleryItem {
    name: string;
    path: string;
}

export interface GalleryData {
    [category: string]: GalleryItem[];
}

export interface CategoryMeta {
    id: string;
    name: string;
    description: string;
    cover: string;
    /** Folder under public/gallery holding this category's photos, if it has one. */
    folder?: string;
    /** Number of photos actually on disk. 0 for cover-only categories. */
    count: number;
    /** Photos actually on disk, in natural order. Empty for cover-only categories. */
    images: GalleryItem[];
}

// Hand-authored. Add `folder` once a category has a matching directory under
// public/gallery — counts and carousels then follow the real files, no edit needed.
const categories: Omit<CategoryMeta, "count" | "images">[] = [
    {
        id: "avenue_trees",
        name: "Avenue Trees",
        description: "Grand ornamental trees that frame driveways, boundaries, and statements.",
        cover: "/gallery/Avenue Trees.jpg",
        folder: "avenues"
    },
    {
        id: "bamboo",
        name: "Bamboo",
        description: "Versatile, structural screening elements in gold, black, blue, and green.",
        cover: "/gallery/Bamboo.jpg",
        folder: "bamboos"
    },
    {
        id: "bonsai",
        name: "Bonsai",
        description: "Meticulously trained miniature giants, representing years of dedicated artistry.",
        cover: "/gallery/bonsai/Bonsai 1.jpg",
        folder: "bonsai"
    },
    {
        id: "bougainvillea",
        name: "Bougainvillea",
        description: "Vibrant, cascading bursts of color in architectural forms.",
        cover: "/gallery/Bougainvillea.jpg"
    },
    {
        id: "climbers",
        name: "Climbers",
        description: "Sculptural climbing vines designed to cover walls, pergolas, and trellises.",
        cover: "/gallery/Climbers.jpg"
    },
    {
        id: "ficus",
        name: "Ficus",
        description: "Diverse structural foliage and statement trees of scale and presence.",
        cover: "/gallery/Ficus.jpg"
    },
    {
        id: "fruit_plants",
        name: "Fruit Plants",
        description: "High-yielding and exotic orchard plants grown for home gardens.",
        cover: "/gallery/Fruit Plants.jpg"
    },
    {
        id: "ground_covers",
        name: "Ground Covers",
        description: "Low-growing foliage that carpets the soil with texture and color.",
        cover: "/gallery/Ground Covers.jpg"
    },
    {
        id: "heliconia",
        name: "Heliconia",
        description: "Exotic tropical blooms with architectural stems and vivid colors.",
        cover: "/gallery/Heliconia.jpg"
    },
    {
        id: "imported_plants",
        name: "Imported Plants",
        description: "Rare and handpicked specimens sourced from elite nurseries worldwide.",
        cover: "/gallery/Imported Plants.jpg"
    },
    {
        id: "indoor_plants",
        name: "Indoor Plants",
        description: "Lush, air-purifying foliage suited for elegant interior spaces.",
        cover: "/gallery/Indoor Plants.jpg"
    },
    {
        id: "lily",
        name: "Lily",
        description: "Elegant flowering lilies that add grace and fragrance to water features and borders.",
        cover: "/gallery/Lily.jpg"
    },
    {
        id: "malpighia",
        name: "Malpighia",
        description: "Meticulously shaped dwarf shrubs and compact statement specimens.",
        cover: "/gallery/Malpighia.jpg",
        folder: "Malpighia Models"
    },
    {
        id: "medicinal_plants",
        name: "Medicinal Plants",
        description: "Curated selection of therapeutic herbs and traditional plants.",
        cover: "/gallery/Medicinal Plants.jpg"
    },
    {
        id: "mexican_grass",
        name: "Mexican Grass",
        description: "Premium carpet grass for lush, pristine lawns.",
        cover: "/gallery/Mexican Grass.jpg"
    },
    {
        id: "olives",
        name: "Olives",
        description: "Ancient, sculptural olive trees bringing a timeless Mediterranean elegance.",
        cover: "/gallery/olives/Olives 1.jpeg",
        folder: "olives"
    },
    {
        id: "palm_varieties",
        name: "Palm Varieties",
        description: "Exotic and tropical palms, adding structural presence and resort-like luxury.",
        cover: "/gallery/Palm Varieties.jpg",
        folder: "palms"
    },
    {
        id: "plumeria",
        name: "Plumeria",
        description: "Fragrant, sculptural flowering trees that symbolize tropical serenity.",
        cover: "/gallery/Plumeria.jpg"
    },
    {
        id: "shrubs",
        name: "Shrubs",
        description: "Versatile structural plants for hedges, borders, and garden styling.",
        cover: "/gallery/Shrubs.jpg"
    },
    {
        id: "topiaries",
        name: "Topiaries",
        description: "Architectural shapes, multi-head clouds, and living sculptures.",
        cover: "/gallery/topiaries/Ficus Black Multiheads.jpg",
        folder: "topiaries"
    }
];

export const galleryData: GalleryData = galleryImages;

export const categoriesMeta: CategoryMeta[] = categories.map((category) => {
    const images = category.folder ? galleryImages[category.folder] ?? [] : [];
    return { ...category, images, count: images.length };
});
