import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "cart";

export const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch (error) {
    console.warn("Failed to parse cart from storage:", error);
    return [];
  }
};

export const persistCart = (items: CartItem[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const calculateTotals = (items: CartItem[]) =>
  items.reduce(
    (acc, item) => {
      const quantity = Number(item.Quantity || 0);
      const cost = Number(item.cost || 0);
      return {
        count: acc.count + quantity,
        cost: acc.cost + quantity * cost,
      };
    },
    { count: 0, cost: 0 }
  );
