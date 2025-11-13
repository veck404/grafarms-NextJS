'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

import Img from "@/components/Img";
import HomeSliders from "@/components/HomeSliders";
import RateCost from "@/components/RateCost";
import type { Product } from "@/data/products";
import { useCartActions } from "@/hooks/useCartActions";
import { useCartContext } from "@/context/cart-context";
import { getProductVolumeLabel } from "@/lib/product-format";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCartActions();
  const { Items } = useCartContext();
  const router = useRouter();
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
    const size = getProductVolumeLabel(product.name);
    addItem({ ...product, size }, quantity);
  };

  const hasCartItems = Items.length > 0;
  const checkoutButtonClasses = [
    "w-full rounded-full border px-5 py-4 text-center font-semibold transition",
    hasCartItems
      ? "border-green-600 text-green-700 hover:-translate-y-[1px] hover:bg-green-50 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
      : "cursor-not-allowed border-neutral-300 text-neutral-400 opacity-60 dark:border-neutral-700 dark:text-neutral-500",
  ].join(" ");

  const handleCheckout = () => {
    if (!hasCartItems) {
      return;
    }
    router.push("/Cart");
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
                className="flex h-12 w-full max-w-[190px] select-none items-center justify-between rounded-full border border-neutral-200 bg-gray-100 px-2 text-neutral-900 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-9 w-10 items-center justify-center rounded-full bg-white text-2xl font-semibold leading-none text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xl font-semibold">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-9 w-10 items-center justify-center rounded-full bg-white text-2xl font-semibold leading-none text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
                >
                  +
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -75 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-grow">
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full rounded-full bg-green-800 px-5 py-4 text-white transition hover:-translate-y-[1px]"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={!hasCartItems}
                    className={checkoutButtonClasses}
                    aria-disabled={!hasCartItems}
                  >
                    Check out
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <HomeSliders text="You might also like" type={product.type} del="yes" id={product.id} />
    </>
  );
}
