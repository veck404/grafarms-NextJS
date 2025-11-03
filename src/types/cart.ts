import type { Product } from "@/data/products";

export type CartItem = Product & {
  Quantity: number;
  color?: string;
  size?: string;
};
