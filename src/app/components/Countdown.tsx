// src/app/components/Countdown.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const target = new Date("2026-01-02T00:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [finished, setFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        setFinished(true);
        clearInterval(tick);
        return;
      }

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [target]);

  if (!mounted) return null;

  const labels = {
    d: "Hari",
    h: "Jam",
    m: "Menit",
    s: "Detik",
  };

  const playfairStyle = { fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#4a3f35", letterSpacing: "0.05em", };

  return (
    <section id="countdown" className="pt-10 pb-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-2xl font-semibold mb-2 text-[#4a3f35] tracking-wider"
          style={playfairStyle}
        >
          Menuju Hari Bahagia
        </h2>
        <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mb-8" />
      </motion.div>

      {finished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold text-[#4a3f35]"
        >
          Alhamdulillah, Hari Bahagia Telah Tiba! 🤍
        </motion.div>
      ) : (
        <div className="flex justify-center gap-3">
          {Object.entries(time).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/40 backdrop-blur-md border-2 border-[#d4af37]/50 rounded-2xl w-20 py-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl font-bold text-[#4a3f35]">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-[10px] mt-1 text-[#86755a] tracking-[0.2em] uppercase font-medium">
                  {labels[key]}
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#d4af37] opacity-60" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#d4af37] opacity-60" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
