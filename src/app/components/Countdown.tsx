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
  }, []);

  if (!mounted) return null;

  const labels: Record<string, string> = {
    d: "Hari",
    h: "Jam",
    m: "Menit",
    s: "Detik",
  };

  return (
    <section id="countdown" className="pt-10 pb-6 text-center fade-in">
      <h2 className="text-xl font-semibold mb-6 text-[#4a3f35] tracking-wide">
        Hitungan Menuju Hari Bahagia
      </h2>

      {finished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold text-[#4a3f35]"
        >
          Alhamdulillah, Hari Bahagia Telah Tiba!
        </motion.div>
      ) : (
        <div className="flex justify-center gap-4">
          {Object.entries(time).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-b from-white/80 to-white/60 
                         border border-[#d4af37] rounded-xl w-24 py-4 shadow-lg"
            >
              <div className="text-3xl font-bold text-[#4a3f35] drop-shadow-sm">
                {value}
              </div>
              <div className="text-xs mt-1 text-[#86755a] tracking-widest uppercase">
                {labels[key]}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
