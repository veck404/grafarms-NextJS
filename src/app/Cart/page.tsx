import type { Metadata } from "next";

import CartPage from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart | Graferd Farms",
};

export default function Cart() {
  return <CartPage />;
}
