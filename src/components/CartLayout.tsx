'use client';

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import Img from "@/components/Img";
import { useCartActions } from "@/hooks/useCartActions";
import type { CartItem } from "@/types/cart";

type CartLayoutProps = {
  item: CartItem;
};

const formatCurrency = (amount: number) => `₦${Number(amount ?? 0).toLocaleString("en-NG")}`;

export default function CartLayout({ item }: CartLayoutProps) {
  const { changeQuantity, removeItem } = useCartActions();
  const [showName, setShowName] = useState(false);

  const handleQuantityChange = (delta: number) => {
    changeQuantity(item, delta);
  };

  const handleDelete = () => {
    removeItem(item);
  };

  return (
    <div className="flex flex-wrap justify-between gap-y-10 sm:flex-nowrap">
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="cart:flex-shrink-0 cart:block flex h-fit max-w-[160px] flex-grow items-center justify-center bg-gray-100 dark:bg-neutral-800 sm:max-w-none">
          <Img className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36" src={item.src} img={item.src?.split("/").pop()?.split(".")[0]} alt={item.name} />
        </div>
        <div className="flex max-w-[160px] flex-col justify-between sm:max-w-none">
          <div className="flex flex-col gap-0.5 sm:gap-2">
            <h1
              className="font-display max-w-[120px] overflow-hidden text-lg font-bold sm:max-w-[190px] sm:text-2xl"
              style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              onClick={() => setShowName((prev) => !prev)}
              title={item.name}
            >
              {item.name}
            </h1>
            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: -30 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bg-black p-2 text-xs text-white"
                >
                  {item.name}
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-sm sm:text-base">Size: {item.size ?? "Any"}</p>
            <p className="text-sm sm:text-base">Color: {item.color ?? "Any"}</p>
          </div>
          <div className="font-display text-xl font-bold sm:text-2xl">{formatCurrency(item.cost)}</div>
        </div>
      </div>
      <div className="cart2:flex-grow-0 relative flex flex-grow flex-col items-end justify-end">
        <FaRegTrashAlt onClick={handleDelete} size={20} className="absolute -top-10 right-0 cursor-pointer font-extrabold text-red-500 cart2:top-0" />
        <div className="flex w-full select-none items-center justify-center gap-5 rounded-full border border-neutral-200 bg-gray-100 px-3 py-1 text-neutral-800 shadow-sm transition dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-none">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="flex-grow rounded-full px-3 py-1 text-center text-4xl transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            -
          </button>
          <span className="font-bold">{item.Quantity}</span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="flex-grow rounded-full px-3 py-1 text-center text-4xl transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
