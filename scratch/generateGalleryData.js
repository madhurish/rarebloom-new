const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../public/gallery');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'galleryData.ts');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const categories = fs.readdirSync(galleryDir).filter(file => {
    return fs.statSync(path.join(galleryDir, file)).isDirectory() && !file.startsWith('.');
});

const data = {};

categories.forEach(category => {
    const catDir = path.join(galleryDir, category);
    const files = fs.readdirSync(catDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) && !file.startsWith('.');
    });

    data[category] = files.map(file => {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        return {
            name: name,
            path: `/gallery/${category}/${file}`
        };
    });
});

const tsContent = `// This file is auto-generated. Do not edit directly.

export interface GalleryItem {
    name: string;
    path: string;
}

export interface GalleryData {
    [category: string]: GalleryItem[];
}

export const galleryData: GalleryData = ${JSON.stringify(data, null, 4)};

export const categoriesMeta = [
    {
        id: "avenues",
        name: "Avenues",
        description: "Grand ornamental trees that frame driveways, boundaries, and statements.",
        count: ${data.avenues ? data.avenues.length : 0},
        cover: "${data.avenues && data.avenues.length > 0 ? data.avenues[0].path : ''}"
    },
    {
        id: "bamboos",
        name: "Bamboos",
        description: "Versatile, structural screening elements in gold, black, blue, and green.",
        count: ${data.bamboos ? data.bamboos.length : 0},
        cover: "${data.bamboos && data.bamboos.length > 0 ? data.bamboos[0].path : ''}"
    },
    {
        id: "bonsai",
        name: "Bonsai",
        description: "Meticulously trained miniature giants, representing years of dedicated artistry.",
        count: ${data.bonsai ? data.bonsai.length : 0},
        cover: "${data.bonsai && data.bonsai.length > 0 ? data.bonsai[0].path : ''}"
    },
    {
        id: "olives",
        name: "Olives",
        description: "Ancient, sculptural olive trees bringing a timeless Mediterranean elegance.",
        count: ${data.olives ? data.olives.length : 0},
        cover: "${data.olives && data.olives.length > 0 ? data.olives[0].path : ''}"
    },
    {
        id: "palms",
        name: "Palms",
        description: "Exotic and tropical palms, adding structural presence and resort-like luxury.",
        count: ${data.palms ? data.palms.length : 0},
        cover: "${data.palms && data.palms.length > 0 ? data.palms[0].path : ''}"
    },
    {
        id: "topiaries",
        name: "Topiaries",
        description: "Architectural shapes, multi-head clouds, and living sculptures.",
        count: ${data.topiaries ? data.topiaries.length : 0},
        cover: "${data.topiaries && data.topiaries.length > 0 ? data.topiaries[0].path : ''}"
    }
];
`;

fs.writeFileSync(outputFile, tsContent);
console.log('Successfully generated galleryData.ts with', Object.keys(data).length, 'categories.');
Object.keys(data).forEach(cat => {
    console.log(`- ${cat}: ${data[cat].length} images`);
});
