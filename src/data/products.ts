import { toProductSlug } from "@/lib/slug";

export type ProductCategory = "newarrival" | "topselling" | "onsale";

export interface Product {
  id: string;
  slug: string;
  place: "shop";
  type: ProductCategory;
  type2: string;
  name: string;
  stars: number;
  cost: number;
  discount: number;
  src: string;
}

const baseProducts: Array<Omit<Product, "slug">> = [
  {
    src: "/svgs/5litres.png",
    id: "5B",
    place: "shop",
    type: "newarrival",
    type2: "All",
    name: "5 Litres Palm Oil – Family Pack",
    stars: 4.7,
    cost: 5650,
    discount: 2,
  },
  {
    src: "/svgs/5litres.png",
    id: "5C",
    place: "shop",
    type: "newarrival",
    type2: "All",
    name: "5 Litres Palm Oil – Organic Blend",
    stars: 4.8,
    cost: 6100,
    discount: 5,
  },
  {
    src: "/svgs/10litres.png",
    id: "10B",
    place: "shop",
    type: "topselling",
    type2: "All",
    name: "10 Litres Palm Oil – Signature Batch",
    stars: 4.9,
    cost: 12250,
    discount: 6,
  },
  {
    src: "/svgs/10litres.png",
    id: "10C",
    place: "shop",
    type: "topselling",
    type2: "All",
    name: "10 Litres Palm Oil – Premium Cold Pressed",
    stars: 5,
    cost: 13000,
    discount: 8,
  },
  {
    src: "/svgs/25litres.png",
    id: "25B",
    place: "shop",
    type: "onsale",
    type2: "All",
    name: "25 Litres Palm Oil – HoReCa Pack",
    stars: 4.9,
    cost: 29000,
    discount: 14,
  },
  {
    src: "/svgs/25litres.png",
    id: "25C",
    place: "shop",
    type: "onsale",
    type2: "All",
    name: "25 Litres Palm Oil – Export Series",
    stars: 4.9,
    cost: 29500,
    discount: 16,
  },
];

export const PRODUCTS: Product[] = baseProducts.map((product) => ({
  ...product,
  slug: toProductSlug(product.name),
}));

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((product) => product.slug === slug);

export const getRelatedProducts = (type: ProductCategory, excludeId?: string): Product[] =>
  PRODUCTS.filter((product) => product.type === type && product.id !== excludeId);
