'use client';

import { createContext, useContext, useState } from "react";

type SideNavContextValue = {
  sideNavHidden: boolean;
  setSideNavHidden: (next: boolean) => void;
  toggleSideNav: () => void;
};

const SideNavContext = createContext<SideNavContextValue | undefined>(undefined);

export function SideNavProvider({ children }: { children: React.ReactNode }) {
  const [sideNavHidden, setSideNavHidden] = useState(true);

  const toggleSideNav = () => setSideNavHidden((prev) => !prev);

  return (
    <SideNavContext.Provider value={{ sideNavHidden, setSideNavHidden, toggleSideNav }}>
      {children}
    </SideNavContext.Provider>
  );
}

export const useSideNav = () => {
  const ctx = useContext(SideNavContext);
  if (!ctx) {
    throw new Error("useSideNav must be used within SideNavProvider");
  }
  return ctx;
};
