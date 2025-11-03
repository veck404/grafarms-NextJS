'use client';

import { CartProvider } from "@/context/cart-context";
import { SideNavProvider } from "@/context/side-nav-context";
import { ThemeProvider } from "@/context/theme-context";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SideNavProvider>
        <CartProvider>{children}</CartProvider>
      </SideNavProvider>
    </ThemeProvider>
  );
}
