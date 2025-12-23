// src/app/home/page.tsx

"use client";

import Hero from "@/app/components/Hero";
import Countdown from "@/app/components/Countdown";
import SwipeHint from "@/app/components/SwipeHint";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div
      className="min-h-screen pt-6 pb-20 px-4 flex justify-center items-center
                 bg-gradient-to-b from-[#fdfcfb] to-[#f9f7f1] relative"
    >
      {/* Ornamen background tipis */}
      <img
        src="/images/floral-bg.png"
        alt="floral pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <SwipeHint />

      {/* SINGLE CARD FULL HEIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glass rounded-3xl p-8 shadow-2xl space-y-12 w-full max-w-xl 
                   min-h-[calc(100vh-150px)] flex flex-col justify-between
                   bg-white/50 backdrop-blur-md border border-[#d4af37]/30"
      >
        <Hero />

        <Countdown />

        <Link
          href="/details"
          className="inline-block mx-auto mt-8 bg-gradient-to-r from-[#d4af37] to-[#e6c85c]
                     text-black px-8 py-3 rounded-full font-semibold shadow-lg text-base
                     hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Lihat Undangan
        </Link>
      </motion.div>
    </div>
  );
}
