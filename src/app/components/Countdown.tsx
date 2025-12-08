// src/app/components/Countdown.tsx

"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const target = new Date("2025-06-18T00:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  return (
    <section id="countdown" className="py-10 text-center fade-in">
      <h2 className="text-2xl font-bold mb-6 text-[#4a3f35]">
        Menuju Hari Bahagia
      </h2>

      <div className="flex justify-center gap-3">
        {Object.entries(time).map(([label, value]) => (
          <div
            key={label}
            className="bg-white/80 border border-[#d4af37]/40 
                       rounded-xl w-20 py-3 shadow-md"
          >
            <div className="text-xl font-bold text-[#4a3f35]">{value}</div>
            <div className="text-[10px] text-[#86755a] tracking-wide">
              {label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
