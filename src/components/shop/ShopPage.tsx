'use client';

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

import ShowProductsByType from "@/components/ShowProductsByType";
import { PRODUCTS } from "@/data/products";

export default function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = useMemo(() => PRODUCTS.filter((product) => product.type2 === "All"), []);

  return (
    <div className="pb-20">
      <section className="my-4 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full mt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-white via-lime-50 to-amber-50 px-6 py-10 shadow-lg dark:border-neutral-800 dark:from-neutral-950 dark:via-emerald-950/30 dark:to-amber-900/20 md:px-12 md:py-14"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <Link href="/" className="cursor-pointer text-neutral-500 hover:underline underline-offset-4 dark:text-neutral-400">
                  Home
                </Link>
                <IoIosArrowForward />
                <span>Shop</span>
              </div>
              <h1 className="font-display mt-4 text-3xl text-green-900 sm:text-4xl dark:text-green-200">Shop palm oil essentials</h1>
              <p className="mt-3 max-w-2xl text-sm text-neutral-600 sm:text-base dark:text-neutral-300">
                Discover premium palm oil varieties for every kitchen size—from family cooking to large-scale food production. Filter by freshness, flavour profile, or packaging to find your perfect match.
              </p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-5 text-sm text-neutral-700 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-200">
              <p className="font-semibold text-green-800 dark:text-emerald-300">Need bulk supply?</p>
              <p className="mt-2">Chat with our procurement team for regional distribution, export-ready batches, and recurring delivery schedules.</p>
              <Link href="/Cart" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline dark:text-emerald-300">
                Start a wholesale request →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      <ShowProductsByType products={products} />
    </div>
  );
}
