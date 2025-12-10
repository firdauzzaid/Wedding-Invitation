// src/app/components/SwipeHint.tsx

"use client";

import { useEffect, useState } from "react";

export default function SwipeHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("swipeHintSeenV2");

    if (!seen) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        localStorage.setItem("swipeHintSeenV2", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center">
      <div className="text-center">

        {/* TEXT */}
        <p className="text-white drop-shadow-lg font-semibold mb-4 text-lg">
          Geser kanan / kiri untuk pindah halaman
        </p>

        {/* ICON SWIPE (REPLACE IMAGE) */}
        <div className="flex justify-center mb-6 animate-swipe-horizontal">
          <svg
            viewBox="0 0 24 24"
            className="w-28 h-10 text-white opacity-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Arrow Left */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 6l-6 6 6 6"
            />
            {/* Arrow Right */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6l6 6-6 6"
            />
          </svg>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            setVisible(false);
            localStorage.setItem("swipeHintSeenV2", "true");
          }}
          className="px-6 py-2 rounded-full border border-white/70 text-white font-semibold backdrop-blur-sm bg-white/10 hover:bg-white/20 transition"
        >
          Mengerti
        </button>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes swipe-horizontal {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(12px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-swipe-horizontal {
          animation: swipe-horizontal 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
