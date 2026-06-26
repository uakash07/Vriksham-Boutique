export interface Product {
  id: string;
  name: string;
  price: number;
  material: string;
  occasion: string;
  colors: string[];
  images: string[];
  blouseIncluded: boolean;
  length: string;
  careInstructions: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  createdAt: Date;
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Soft Silk Saree - Lavender",
    price: 2499,
    material: "Silk",
    occasion: "Wedding",
    colors: ["#C8A8E9", "#E8D5F5", "#B090D0"],
    images: [],
    blouseIncluded: true,
    length: "6.3 meters",
    careInstructions: "Dry clean only",
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Cotton Daily Wear - Teal",
    price: 899,
    material: "Cotton",
    occasion: "Casual",
    colors: ["#008080", "#20B2AA", "#40E0D0"],
    images: [],
    blouseIncluded: false,
    length: "6 meters",
    careInstructions: "Machine wash cold",
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Banarasi Silk - Red Gold",
    price: 4999,
    material: "Banarasi",
    occasion: "Wedding",
    colors: ["#8B0000", "#C4922A", "#FFD700"],
    images: [],
    blouseIncluded: true,
    length: "6.5 meters",
    careInstructions: "Dry clean only",
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Organza Party Saree - Mint Green",
    price: 1899,
    material: "Organza",
    occasion: "Party Wear",
    colors: ["#98FF98", "#90EE90", "#3CB371"],
    images: [],
    blouseIncluded: true,
    length: "6 meters",
    careInstructions: "Hand wash gently",
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Linen Summer Saree - Off White",
    price: 1299,
    material: "Linen",
    occasion: "Casual",
    colors: ["#FAF0E6", "#FFF8F0", "#FFFDD0"],
    images: [],
    blouseIncluded: false,
    length: "6 meters",
    careInstructions: "Hand wash cold",
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Chanderi Silk - Peach",
    price: 2199,
    material: "Chanderi",
    occasion: "Festival",
    colors: ["#FFCBA4", "#FFB347", "#FF8C69"],
    images: [],
    blouseIncluded: true,
    length: "6.3 meters",
    careInstructions: "Dry clean recommended",
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Kota Cotton - Navy Blue",
    price: 1499,
    material: "Kota",
    occasion: "Office Wear",
    colors: ["#000080", "#0000CD", "#4169E1"],
    images: [],
    blouseIncluded: false,
    length: "6 meters",
    careInstructions: "Machine wash cold",
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Tussar Silk - Mustard",
    price: 3299,
    material: "Tussar Silk",
    occasion: "Party Wear",
    colors: ["#FFDB58", "#DAA520", "#B8860B"],
    images: [],
    blouseIncluded: true,
    length: "6.3 meters",
    careInstructions: "Dry clean only",
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(),
  },
];

export async function getProducts(): Promise<Product[]> {
  return SEED_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  return SEED_PRODUCTS.find((p) => p.id === id) || null;
}
