'use client';

import { useCallback } from "react";

import type { Product } from "@/data/products";
import type { CartItem } from "@/types/cart";
import { useCartContext } from "@/context/cart-context";

type CartCandidate = (Product | CartItem) & {
  color?: string;
  size?: string;
  Quantity?: number;
};

const matchCartItem = (target: CartCandidate) => (item: CartItem) =>
  item.id === target.id && item.color === target.color && item.size === target.size;

export function useCartActions() {
  const { Items, setItems } = useCartContext();

  const addItem = useCallback(
    (product: CartCandidate | null | undefined, quantity = 1) => {
      if (!product) {
        return [];
      }

      const normalizedQuantity = Number(quantity) || Number(product.Quantity) || 1;
      const nextItems = [...Items];
      const existingIndex = nextItems.findIndex(matchCartItem(product));

      if (existingIndex >= 0) {
        const existing = nextItems[existingIndex];
        nextItems[existingIndex] = {
          ...existing,
          Quantity: Math.max(existing.Quantity + normalizedQuantity, 1),
        };
      } else if (normalizedQuantity > 0) {
        nextItems.push({
          ...(product as Product),
          color: product.color,
          size: product.size,
          Quantity: normalizedQuantity,
        });
      }

      setItems(nextItems);
      return nextItems;
    },
    [Items, setItems]
  );

  const changeQuantity = useCallback(
    (item: CartCandidate | null | undefined, delta: number) => {
      if (!item || !delta) {
        return [];
      }

      const nextItems = Items.map((existing) =>
        matchCartItem(item)(existing)
          ? {
              ...existing,
              Quantity: existing.Quantity + delta,
            }
          : existing
      ).filter((existing) => existing.Quantity > 0);

      setItems(nextItems);
      return nextItems;
    },
    [Items, setItems]
  );

  const removeItem = useCallback(
    (item: CartCandidate | null | undefined) => {
      if (!item) {
        return [];
      }

      const nextItems = Items.filter((existing) => !matchCartItem(item)(existing));
      setItems(nextItems);
      return nextItems;
    },
    [Items, setItems]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    return [];
  }, [setItems]);

  return { addItem, changeQuantity, removeItem, clearCart };
}

export default useCartActions;
