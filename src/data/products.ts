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
    id: "5A",
    place: "shop",
    type: "newarrival",
    type2: "All",
    name: "5 Litres Palm Oil – Fresh Family Pack",
    stars: 4.8,
    cost: 11980,
    discount: 5,
  },
  {
    src: "/svgs/10litres.png",
    id: "10A",
    place: "shop",
    type: "topselling",
    type2: "All",
    name: "10 Litres Palm Oil – Premium Batch",
    stars: 4.9,
    cost: 27960,
    discount: 4,
  },
  {
    src: "/svgs/25litres.png",
    id: "25A",
    place: "shop",
    type: "onsale",
    type2: "All",
    name: "25 Litres Palm Oil – HoReCa Pack",
    stars: 5,
    cost: 54500,
    discount: 3,
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
