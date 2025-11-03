'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Img from "@/components/Img";
import RateCost from "@/components/RateCost";
import type { Product } from "@/data/products";

type ShowProductsByTypeProps = {
  products?: Product[];
};

export default function ShowProductsByType({ products = [] }: ShowProductsByTypeProps) {
  const router = useRouter();
  const validProducts = useMemo(() => products.filter(Boolean), [products]);

  const handleNavigate = (slug: string) => () => router.push(`/Shop/${slug}`);

  return (
    <section className="px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full mt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-green-900 sm:text-3xl dark:text-green-200">Palm Oil Products</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Browse our curated collection of cold-pressed palm oil, ready for homes, restaurants, and regional distributors.
          </p>
        </div>
      </div>

      {validProducts.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-neutral-300 bg-white/70 p-10 text-center dark:border-neutral-700 dark:bg-neutral-900/60">
          <p className="font-display text-lg font-semibold text-neutral-700 dark:text-neutral-200">No products available right now.</p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Please check back soon—we’re pressing a fresh batch.</p>
        </div>
      ) : (
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {validProducts.map((item) => (
            <motion.article
              key={item.slug}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              whileTap={{ scale: 0.98 }}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <motion.button
                type="button"
                onClick={handleNavigate(item.slug)}
                className="group block aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Img className="h-full w-full" src={item.src} alt={item.name} />
              </motion.button>
              <div className="p-4">
                <RateCost name={item.name} stars={item.stars} cost={item.cost} discount={item.discount} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
