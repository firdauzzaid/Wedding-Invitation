// src/app/components/Hero.tsx

"use client";

import { playfair } from "../fonts";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center
                 bg-[url('/images/floral-bg.png')] bg-cover bg-center bg-fixed"
    >
      {/* Overlay tipis agar teks tetap jelas */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      {/* CARD / DOOR EFFECT */}
      <div className="relative z-10 px-4 flex flex-col items-center text-center">

        {/* ORNAMENT TOP */}
        <div className="mb-2">
          <div className="w-14 h-[2px] bg-[#d4af37] mx-auto" />
          <img
            src="/images/bismillah.png"
            alt="Bismillah"
            className="w-40 mx-auto opacity-90"
          />
        </div>

        {/* NAMES dengan animasi */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`
            ${playfair.className}
            text-[#1f2937]
            drop-shadow-sm
            leading-snug
          `}
        >
          <span className="block text-3xl md:text-4xl font-semibold">
            Zhafron Firdaus
          </span>
          <span className="block text-sm mt-1 text-gray-600">
            bin Kandar Wibowo
          </span>

          <span className="block my-4 text-[#d4af37] text-2xl font-medium">
            &
          </span>

          <span className="block text-3xl md:text-4xl font-semibold">
            Annisa Zahra
          </span>
          <span className="block text-sm mt-1 text-gray-600">
            binti Liga Bogi Agustian
          </span>
        </motion.h1>

        {/* ORNAMENT BOTTOM */}
        <div className="mt-8">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </div>
      </div>

      {/* Ornamen floral di sudut */}
      <img
        src="/images/floral-corner-left.png"
        alt="floral left"
        className="absolute bottom-0 left-0 w-32 opacity-60"
      />
      <img
        src="/images/floral-corner-right.png"
        alt="floral right"
        className="absolute bottom-0 right-0 w-32 opacity-60"
      />
    </section>
  );
}
