'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

import Img from "@/components/Img";
import HomeSliders from "@/components/HomeSliders";
import RateCost from "@/components/RateCost";
import { useCartActions } from "@/hooks/useCartActions";
import type { Product } from "@/data/products";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCartActions();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.slug]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      return next < 1 ? 1 : next;
    });
  };

  const handleSubmit = () => {
    const color = "Any";
    const size = "Any";
    addItem({ ...product, color, size }, quantity);
  };

  return (
    <>
      <div className="my-5 flex items-center gap-4 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-gray-400">
          Home
        </Link>
        <IoIosArrowForward color="gray" />
        <Link href="/Shop" className="text-gray-400">
          Shop
        </Link>
        <IoIosArrowForward color="gray" />
        <p>{product.name}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-x-10 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex-grow justify-center rounded-xl bg-gray-100 dark:bg-neutral-800">
          <Img className="h-full w-full max-w-[420px] p-6 md:p-10" src={product.src} alt={product.name} />
        </div>
        <div className="relative mt-6 w-full md:mt-0 md:max-w-[480px]">
          <RateCost from="Prodcut" name={product.name} cost={product.cost} discount={product.discount} stars={product.stars} />
          <div className="mt-10">
            <hr />
            <div className="mt-10 flex flex-col flex-wrap gap-10 xsm:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -75 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex h-16 select-none items-center justify-center gap-5 rounded-full border border-transparent bg-gray-100 px-3 py-1 text-neutral-900 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 xsm:w-[25%]"
              >
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="flex-grow rounded-full px-3 py-1 text-center text-4xl transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  -
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="flex-grow rounded-full px-3 py-1 text-center text-4xl transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  +
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -75 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-grow">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-full bg-black px-5 py-4 text-white transition hover:-translate-y-[1px]"
                >
                  Add to Cart
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <HomeSliders text="You might also like" type={product.type} del="yes" id={product.id} />
    </>
  );
}
