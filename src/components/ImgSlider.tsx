'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

import Img from "@/components/Img";
import RateCost from "@/components/RateCost";
import { getRelatedProducts, type ProductCategory, PRODUCTS } from "@/data/products";

type ImgSliderProps = {
  type: ProductCategory;
  del?: "yes" | "no";
  id?: string;
};

export default function ImgSlider({ type, del = "no", id }: ImgSliderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mainDiv = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(mainDiv, { once: true });
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const products = useMemo(
    () => (del === "yes" ? getRelatedProducts(type, id) : PRODUCTS.filter((product) => product.type === type)),
    [del, id, type]
  );

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateMatch = () => setIsMobile(window.innerWidth < 640);
    updateMatch();
    window.addEventListener("resize", updateMatch);
    return () => window.removeEventListener("resize", updateMatch);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ref.current) return;
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
    }, 1);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (slug: string) => () => {
    router.push(`/Shop/${slug}`);
  };

  const visibleProducts = isMobile ? products.slice(0, 1) : products;

  return (
    <div className="mt-10 flex justify-center overflow-hidden" ref={ref}>
      <motion.div
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
        ref={mainDiv}
        className={`mx-auto flex w-fit cursor-pointer gap-5 ${isMobile ? "justify-center" : ""}`}
      >
        {visibleProducts.map((product, index) => (
          <motion.div key={product.slug} whileTap={{ scale: 0.97 }} className="flex justify-center">
            <motion.div
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -75 },
              }}
              transition={{ delay: index * 0.1, type: "just" }}
              initial="hidden"
              animate={controls}
              className="mx-auto flex w-[260px] flex-col gap-4 rounded-3xl border border-neutral-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                className="group overflow-hidden rounded-2xl bg-lime-50/60 dark:bg-neutral-800/60"
                onClick={handleClick(product.slug)}
              >
                <Img className="h-[230px] w-full transition duration-500 group-hover:scale-105" src={product.src} alt={product.name} />
              </motion.button>
              <div className="px-1 pb-1">
                <RateCost name={product.name} stars={product.stars} cost={product.cost} discount={product.discount} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
