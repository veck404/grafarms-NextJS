'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import type { CartItem } from "@/types/cart";
import { calculateTotals, loadCart, persistCart } from "@/lib/cart-storage";

type CartContextValue = {
  Cart: number;
  setCart: (count: number) => void;
  Cost: number;
  setCost: (cost: number) => void;
  Items: CartItem[];
  setItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const initialised = useRef(false);
  const [Items, setItemsState] = useState<CartItem[]>([]);
  const [Cart, setCart] = useState(0);
  const [Cost, setCost] = useState(0);

  useEffect(() => {
    const storedItems = loadCart();
    const { count, cost } = calculateTotals(storedItems);
    setItemsState(storedItems);
    setCart(count);
    setCost(cost);
    initialised.current = true;
  }, []);

  useEffect(() => {
    if (!initialised.current) {
      return;
    }
    persistCart(Items);
  }, [Items]);

  const setItems = (nextItems: CartItem[]) => {
    setItemsState(nextItems);
    const { count, cost } = calculateTotals(nextItems);
    setCart(count);
    setCost(cost);
  };

  const value = useMemo(
    () => ({
      Cart,
      setCart,
      Cost,
      setCost,
      Items,
      setItems,
    }),
    [Cart, Cost, Items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return ctx;
};
