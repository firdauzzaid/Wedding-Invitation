// src/app/components/Splash.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function Splash({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center flex-col overflow-hidden"
        >
          {/* Background image dengan blend */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/download.jpeg')",
              filter: "brightness(1.1) contrast(0.9)",
            }}
          />

          {/* Gradient overlay dengan warna wedding */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcfb] via-[#f5f1e8]/95 to-[#fdfcfb]" />

          {/* Radial gradient untuk spotlight effect */}
          <div
            className="absolute inset-0 bg-radial-gradient opacity-60"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(212, 175, 55, 0.1) 100%)",
            }}
          />

          {/* Floating ornaments - Top corners */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: -15 }}
            animate={{ opacity: 0.3, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-8 left-8 w-24 h-24"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="#d4af37"
                strokeWidth="0.5"
              />
              <path
                d="M 50 10 Q 60 30 50 50 Q 40 30 50 10"
                fill="#d4af37"
                opacity="0.3"
              />
              <path
                d="M 90 50 Q 70 60 50 50 Q 70 40 90 50"
                fill="#d4af37"
                opacity="0.3"
              />
              <path
                d="M 50 90 Q 40 70 50 50 Q 60 70 50 90"
                fill="#d4af37"
                opacity="0.3"
              />
              <path
                d="M 10 50 Q 30 40 50 50 Q 30 60 10 50"
                fill="#d4af37"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30, rotate: 15 }}
            animate={{ opacity: 0.3, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-8 right-8 w-24 h-24"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="#d4af37"
                strokeWidth="0.5"
              />
              <path
                d="M 50 10 Q 60 30 50 50 Q 40 30 50 10"
                fill="#d4af37"
                opacity="0.3"
              />
              <path
                d="M 90 50 Q 70 60 50 50 Q 70 40 90 50"
                fill="#d4af37"
                opacity="0.3"
              />
              <path
                d="M 50 90 Q 40 70 50 50 Q 60 70 50 90"
                fill="#d4af37"
                opacity="0.3"
              />
              <path
                d="M 10 50 Q 30 40 50 50 Q 30 60 10 50"
                fill="#d4af37"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Floating ornaments - Bottom corners */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 15 }}
            animate={{ opacity: 0.3, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute bottom-8 left-8 w-20 h-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50 20 L 55 40 L 75 45 L 60 60 L 63 80 L 50 70 L 37 80 L 40 60 L 25 45 L 45 40 Z"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -15 }}
            animate={{ opacity: 0.3, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute bottom-8 right-8 w-20 h-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50 20 L 55 40 L 75 45 L 60 60 L 63 80 L 50 70 L 37 80 L 40 60 L 25 45 L 45 40 Z"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          {/* Animated sparkles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            className="absolute top-1/4 left-1/4"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.8,
              delay: 0.3,
            }}
            className="absolute top-1/3 right-1/4"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 0.6,
            }}
            className="absolute bottom-1/3 left-1/3"
          >
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </motion.div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            {/* Top decorative line with heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.div
                className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/30" />
              <motion.div
                className="w-16 h-[2px] bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            {/* Title with elegant animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm tracking-[0.3em] text-[#86755a] uppercase mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                The Wedding of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-4xl md:text-5xl font-bold tracking-wide text-[#b89452] mb-1"
                style={{
                  fontFamily: "Playfair Display, serif",
                  textShadow: "0 2px 20px rgba(212, 175, 55, 0.15)",
                }}
              >
                Undangan Pernikahan
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex items-center justify-center gap-2 mt-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <div className="w-2 h-2 rounded-full bg-[#d4af37]/60" />
                <div className="w-2 h-2 rounded-full bg-[#d4af37]/30" />
              </motion.div>
            </motion.div>

            {/* Elegant loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="w-48 md:w-64"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
                className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full overflow-hidden relative"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="text-xs text-[#86755a] text-center mt-3 tracking-wider"
              >
                Loading your invitation...
              </motion.p>
            </motion.div>

            {/* Bottom decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex items-center gap-2 mt-2"
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] rotate-45" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>
          </div>

          {/* Subtle vignette effect */}
          <div
            className="absolute inset-0 bg-radial-gradient pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(253, 252, 251, 0.8) 100%)",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
