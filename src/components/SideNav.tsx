'use client';

import { FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSideNav } from "@/context/side-nav-context";
import { toProductSlug } from "@/lib/slug";

export default function SideNav() {
  const { sideNavHidden, toggleSideNav, setSideNavHidden } = useSideNav();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = searchRef.current?.value?.trim();
    if (!value) return;
    const slug = toProductSlug(value);
    setSideNavHidden(true);
    router.push(`/Shop/${slug}`);
  };

  return (
    <motion.div
      variants={{
        visible: { x: 0 },
        hidden: { x: "100%" },
      }}
      initial={{ x: "100%" }}
      animate={sideNavHidden ? "hidden" : "visible"}
      transition={{ type: "just" }}
      className="fixed right-0 top-0 z-50 h-screen w-64 max-w-full bg-black p-10 text-white nav:hidden"
    >
      <div>
        <svg
          onClick={toggleSideNav}
          className="mb-5 h-6 w-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <div>
          <ul className="mt-10 flex flex-col gap-10">
            <li>
              <Link className="hover:underline underline-offset-4" href="/Shop" onClick={() => setSideNavHidden(true)}>
                Shop
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-4" href="/TopSelling" onClick={() => setSideNavHidden(true)}>
                Top Selling
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-4" href="/Journey" onClick={() => setSideNavHidden(true)}>
                About Us
              </Link>
            </li>
            <form className="flex gap-2" onSubmit={handleFormSubmit}>
              <button type="submit" aria-label="Search for products">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              <input ref={searchRef} className="w-full bg-transparent p-1 outline-none" type="text" placeholder="Search for products..." />
            </form>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
