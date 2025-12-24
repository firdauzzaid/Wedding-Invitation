// src/app/details/page.tsx

"use client";

import { motion } from "framer-motion";
import Details from "@/app/components/Details";
import MapLocation from "@/app/components/MapLocation";

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fdfcfb] via-[#f9f7f1] to-[#f5f1e8]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="floral-details"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="2" fill="#d4af37" />
              <circle cx="25" cy="25" r="1" fill="#d4af37" />
              <circle cx="75" cy="75" r="1" fill="#d4af37" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#floral-details)" />
        </svg>
        <div className="absolute inset-0 opacity-60">
          <img
            src="/images/BG-Wedding.png"
            alt="Ornaments"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </div>

      {/* Floating ornaments */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 z-10 right-12 w-16 h-16 border-2 border-[#d4af37]/20 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 z-10 right-10 w-12 h-12 border-2 border-[#d4af37]/20 rounded-full"
      />

      <div className="px-4 py-8 relative flex flex-col items-center">
        {/* MAIN GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-3xl rounded-[2rem] p-8 md:p-12 shadow-2xl w-full max-w-2xl
                       bg-white/30 backdrop-blur-xl border border-white/50 gap-6
                       min-h-[calc(100vh-100px)] flex flex-col justify-between"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl-[2rem]" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-[2rem]" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl-[2rem]" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br-[2rem]" />

          {/* Details Section */}
          <Details />

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <div className="w-3 h-3 border-2 border-[#d4af37] rotate-45" />
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent via-[#d4af37] to-transparent" />
          </div>

          {/* Map Section */}
          <MapLocation />
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30" />
    </div>
  );
}
