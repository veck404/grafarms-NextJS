'use client';

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

type RateCostProps = {
  from?: "Home" | "Prodcut" | string;
  name: string;
  stars?: number;
  cost: number;
  discount?: number;
};

export default function RateCost({ from = "Home", name, stars = 5, cost, discount = 0 }: RateCostProps) {
  const formattedCost = new Intl.NumberFormat("en-NG").format(cost);
  const formattedOldCost = new Intl.NumberFormat("en-NG").format(cost + (cost * discount) / 100);
  const wholeStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;

  return (
    <div className={from === "Home" ? "flex h-full flex-col justify-between" : ""}>
      <div>
        <h1
          className={`font-bold ${
            from !== "Home"
              ? "font-display text-4xl max-w-[600px] sm:text-5xl text-neutral-900 dark:text-neutral-100"
              : "text-lg text-neutral-900 dark:text-neutral-100"
          }`}
        >
          {name}
        </h1>
      </div>
      <div className={from !== "Home" ? "mt-4" : "mt-2"}>
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex">
            {Array.from({ length: wholeStars }).map((_, index) => (
              <span className="flex flex-row" key={`star-${index}`}>
                <FaStar className="text-amber-400" />
                {index + 1 === wholeStars && hasHalfStar && <FaStarHalfAlt className="text-amber-400" />}
              </span>
            ))}
          </div>
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{stars}</span>
          <span>/ 5</span>
        </div>
        <div
          className={`mt-3 flex items-center gap-2 ${
            from !== "Home" ? "font-display text-2xl font-semibold" : "text-xl font-semibold"
          }`}
        >
          <span className="text-green-800 dark:text-emerald-300">₦{formattedCost}</span>
          {discount > 0 && (
            <div className="flex items-center gap-2 text-sm font-medium">
              <del className="text-neutral-400 dark:text-neutral-500">₦{formattedOldCost}</del>
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-500 dark:bg-red-900/40 dark:text-red-300">
                -{discount}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
