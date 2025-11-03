'use client';

import Link from "next/link";
import { motion } from "framer-motion";

import Img from "@/components/Img";

export default function Page404() {
  return (
    <div className="my-4 px-4 xsm:px-6 md:px-8 max-w-6xl mx-auto w-full flex-col-reverse lg:flex-row flex items-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="font-display text-4xl xsm:text-5xl">Something went wrong</h1>
        <p>We can&apos;t seem to find the page you are looking for.</p>
        <div className="p-4">
          <Link className="rounded-3xl bg-black px-16 py-3 text-white" href="/">
            Back to home
          </Link>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "just" }}
        className="flex-grow relative w-full nav:w-fit"
      >
        <Img src="/Undraw404.png" alt="Page not found" img="Error" />
      </motion.div>
    </div>
  );
}
