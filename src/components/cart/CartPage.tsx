'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

import CartLayout from "@/components/CartLayout";
import Img from "@/components/Img";
import { useCartContext } from "@/context/cart-context";

const WHATSAPP_NUMBER = "2347017567105";

const formatCurrency = (amount: number) => `₦${Number(amount ?? 0).toLocaleString("en-NG")}`;

export default function CartPage() {
  const { Cost, Items } = useCartContext();
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = Number(Cost || 0);
  const deliveryFee = 0;
  const deliveryFeeNote = "You'll be notified of the exact fee before dispatch.";
  const total = useMemo(() => deliveryFee + subtotal, [deliveryFee, subtotal]);

  const handleCheckout = () => {
    if (!Items.length) {
      return;
    }

    if (!customerName.trim() || !deliveryAddress.trim()) {
      setFormError("Please provide your name and delivery address before checking out.");
      return;
    }

    setFormError("");

    const orderLines = Items.map((item, index) => {
      const attributes = [item.size && `Size: ${item.size}`, item.color && `Color: ${item.color}`].filter(Boolean).join(" • ");
      const descriptor = attributes ? `${item.name} (${attributes})` : item.name;
      const lineTotal = Number(item.cost || 0) * Number(item.Quantity || 0);
      return `${index + 1}. ${descriptor} x${item.Quantity} — ${formatCurrency(lineTotal)}`;
    }).join("\n");

    const contactLines = [`Customer Name: ${customerName.trim()}`, `Delivery Address: ${deliveryAddress.trim()}`];

    const summaryLines = [
      `Subtotal: ${formatCurrency(subtotal)}`,
      `Delivery Fee: ${deliveryFeeNote}`,
      `Total: ${formatCurrency(total)}`,
    ].filter(Boolean);

    const message = [
      "Hello Graferd Farms team, I'd like to place an order via the web shop.",
      "",
      orderLines,
      "",
      contactLines.join("\n"),
      "",
      summaryLines.join("\n"),
      "",
      "Please confirm availability and delivery options. Thank you!",
    ]
      .filter((line) => line && line.trim().length > 0)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  };

  if (!Items.length) {
    return (
      <div className="my-4 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full flex-col-reverse lg:flex-row flex items-center">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-display text-4xl xsm:text-5xl">Your Cart is Empty!</h1>
          <p>Must add items on the cart before you proceed to checkout</p>
          <div className="p-4">
            <Link className="rounded-3xl bg-black px-16 py-3 text-white" href="/Shop">
              Go to Shop
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "just" }}
          className="flex-grow relative w-full nav:w-fit"
        >
          <Img src="/undraw_shopping_app_flsj.png" alt="" img="Empty" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="my-4 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full">
      <div className="my-5 flex items-center gap-4">
        <Link href="/" className="text-gray-400">
          Home
        </Link>
        <IoIosArrowForward color="gray" />
        <p>Cart</p>
      </div>
      <h1 className="font-display text-3xl xsm:text-4xl">Your Cart</h1>
      <div className="mt-10 flex flex-wrap gap-5">
        <motion.div key={Items.length} className="flex h-fit flex-grow flex-col rounded-xl border-2 p-5">
          <AnimatePresence>
            {Items.map((item, index) => (
              <AnimatePresence key={`${item.id}-${item.color ?? "any"}-${item.size ?? "any"}`} mode="wait">
                <motion.div
                  initial={{ height: "auto", opacity: 0, y: 0 }}
                  animate={{ height: "auto", opacity: 1, y: 10 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ type: "just", delay: 0.1 * index }}
                >
                  <CartLayout item={item} />
                  {index + 1 !== Items.length && <hr className="my-5" />}
                </motion.div>
              </AnimatePresence>
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex h-fit flex-grow flex-col rounded-xl border-2 p-5 sm:min-w-[450px]">
          <h2 className="font-display mb-5 text-xl font-bold">Order Summary</h2>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <div>Subtotal</div>
              <div className="font-display text-lg font-bold">{formatCurrency(subtotal)}</div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>Delivery Fee</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 sm:text-right">{deliveryFeeNote}</div>
            </div>
            <hr />
            <div className="flex justify-between">
              <div>Total</div>
              <div className="font-display text-lg font-bold">{formatCurrency(total)}</div>
            </div>
            <div className="grid gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <span>Full Name</span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/30"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <span>Delivery Address</span>
                <textarea
                  value={deliveryAddress}
                  onChange={(event) => setDeliveryAddress(event.target.value)}
                  placeholder="Include street, city, and any delivery notes"
                  rows={3}
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/30"
                />
              </label>
              {formError && <p className="text-sm font-medium text-red-600 dark:text-red-400">{formError}</p>}
            </div>
            <div className="mt-5 flex">
              <button
                type="button"
                onClick={handleCheckout}
                className="flex-grow rounded-3xl bg-black px-16 py-3 text-center text-white transition hover:-translate-y-[1px]"
              >
                Checkout on WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
