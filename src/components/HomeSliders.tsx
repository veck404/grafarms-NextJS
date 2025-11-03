'use client';

import { motion } from "framer-motion";

import ImgSlider from "@/components/ImgSlider";
import type { ProductCategory } from "@/data/products";

const copyByType: Record<ProductCategory, string> = {
  newarrival: "Tap into the latest batches pressed this week and taste the difference freshness makes.",
  topselling: "Best sellers picked by chefs, caterers, and palm oil lovers across the country.",
  onsale: "Limited-time price cuts across crowd favourites—perfect for stocking up smartly.",
};

type HomeSlidersProps = {
  text: string;
  type: ProductCategory;
  del?: "yes" | "no";
  id?: string;
};

export default function HomeSliders({ text, type, del = "no", id }: HomeSlidersProps) {
  const typeLabel = type.toUpperCase();

  return (
    <section className="my-4 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.4em] text-green-700 dark:text-emerald-300">
          <span className="h-1 w-8 rounded-full bg-green-700 dark:bg-emerald-300" />
          <span>{typeLabel}</span>
          <span className="h-1 w-8 rounded-full bg-green-700 dark:bg-emerald-300" />
        </div>
        <h2 className="font-display text-3xl text-green-900 sm:text-4xl dark:text-green-200">{text}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 sm:text-base dark:text-neutral-300">
          {copyByType[type] || "Discover palm oil varieties curated to elevate every kitchen moment."}
        </p>
      </motion.div>
      <ImgSlider type={type} del={del} id={id} />
    </section>
  );
}
