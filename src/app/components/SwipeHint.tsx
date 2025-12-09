// src/app/components/SwipHint.tsx

"use client";

import { useEffect, useState } from "react";

interface Props {
  swipeImage?: string; // path ke gambar panah gabungan
}

export default function SwipeHintModal({ swipeImage = "/images/swipe-arrow.png" }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hilang otomatis
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full text-center shadow-lg relative">
        {/* Teks instruksi */}
        <p className="text-gray-900 font-semibold mb-4 text-lg">
          Geser kanan / kiri untuk pindah halaman
        </p>

        {/* Gambar swipe */}
        <div className="flex justify-center mb-4">
          <img
            src={swipeImage}
            alt="Swipe kanan/kiri"
            className="w-32 h-auto opacity-70 animate-bounce-swipe"
          />
        </div>

        {/* Tombol mengerti */}
        <button
          onClick={() => setVisible(false)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Mengerti
        </button>

        {/* Animasi gambar */}
        <style jsx>{`
          @keyframes bounce-swipe {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .animate-bounce-swipe { animation: bounce-swipe 1s infinite; }
        `}</style>
      </div>
    </div>
  );
}
