// src/app/components/Hero.tsx

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Font configuration (Playfair Display)
const playfairStyle = {
  fontFamily: "Playfair Display, serif",
};

// Komponen Hero
export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center py-12">
      <div className="relative z-10 px-4 flex flex-col items-center text-center">
        {/* ORNAMENT TOP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          <div className="w-56 h-36 mx-auto overflow-hidden">
            <img
              src="/images/bismillah.png"
              alt="Bismillah"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </motion.div>

        {/* QUOTE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm text-[#86755a] italic mb-8 max-w-md leading-relaxed"
        >
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          pasangan hidup dari jenismu sendiri"
        </motion.p>

        {/* NAMES dengan animasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-[#1f2937] leading-relaxed"
          style={playfairStyle}
        >
          <div className="mb-8">
            <span className="block text-5xl md:text-6xl font-bold tracking-wide text-[#4a3f35]">
              Zhafron
            </span>
            <span className="block text-lg mt-2 text-[#86755a] font-light tracking-widest">
              FIRDAUS
            </span>
            <span className="block text-sm mt-2 text-gray-500 font-normal">
              Putra dari Bapak Kandar Wibowo
            </span>
          </div>

          <div className="my-8 flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-[#d4af37]" />
            <span className="text-3xl text-[#d4af37] font-light">&</span>
            <div className="w-12 h-[1px] bg-[#d4af37]" />
          </div>

          <div className="mt-8">
            <span className="block text-5xl md:text-6xl font-bold tracking-wide text-[#4a3f35]">
              Annisa
            </span>
            <span className="block text-lg mt-2 text-[#86755a] font-light tracking-widest">
              ZAHRA
            </span>
            <span className="block text-sm mt-2 text-gray-500 font-normal">
              Putri dari Bapak Liga Bogi Agustian
            </span>
          </div>
        </motion.div>

        {/* ORNAMENT BOTTOM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#d4af37] rotate-45" />
            <div className="w-20 h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent" />
            <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <div className="w-20 h-[1px] bg-gradient-to-l from-[#d4af37] to-transparent" />
            <div className="w-8 h-8 border border-[#d4af37] rotate-45" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
