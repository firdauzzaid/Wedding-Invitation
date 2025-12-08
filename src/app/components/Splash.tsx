// src/app/components/Splash.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Splash({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  // Render splash hanya di client
  useEffect(() => {
    setShow(true); // aktifkan setelah mount
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center flex-col bg-white overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-80"
        style={{ backgroundImage: "url('/images/download.jpeg')" }}
      />

      {/* Mask */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-3xl md:text-4xl font-semibold tracking-wide text-[#b89452]"
      >
        Undangan Pernikahan
      </motion.h1>

      {/* Loading Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "90%" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="relative z-10 mt-6 h-[3px] bg-[#d4af37]/40 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
          className="h-full bg-[#d4af37]"
        />
      </motion.div>
    </motion.div>
  );
}
