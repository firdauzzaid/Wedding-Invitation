// src/app/components/SwipeHint.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SwipeHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show hint after page load
    const timer = setTimeout(() => {
      setVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      // Auto hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center px-6"
      >
        {/* Decorative top border */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/50" />
          <div className="w-3 h-3 border-2 border-white/50 rotate-45 mx-4" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/50" />
        </div>

        {/* TEXT */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white drop-shadow-lg font-semibold mb-6 text-lg tracking-wide"
        >
          Geser kanan / kiri untuk pindah halaman
        </motion.p>

        {/* ICON SWIPE with enhanced animation */}
        <motion.div
          animate={{
            x: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center mb-8"
        >
          <svg
            viewBox="0 0 120 30"
            className="w-40 h-12 text-white opacity-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            {/* Left arrow */}
            <path
              d="M35 15 H5 M10 9 L5 15 L10 21"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center dots */}
            <circle cx="50" cy="15" r="2" fill="currentColor" />
            <circle cx="60" cy="15" r="2" fill="currentColor" />
            <circle cx="70" cy="15" r="2" fill="currentColor" />

            {/* Right arrow */}
            <path
              d="M85 15 H115 M110 9 L115 15 L110 21"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* BUTTON with elegant styling */}
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVisible(false)}
          className="relative px-8 py-3 rounded-full border-2 border-white/70 text-white font-semibold 
                     backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300
                     shadow-lg hover:shadow-xl overflow-hidden group"
        >
          <span className="relative z-10">Mengerti</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Decorative bottom border */}
        <div className="flex items-center justify-center mt-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/50" />
          <div className="w-3 h-3 border-2 border-white/50 rotate-45 mx-4" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/50" />
        </div>
      </motion.div>
    </motion.div>
  );
}