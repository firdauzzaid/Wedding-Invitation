// src/app/components/ShareInvite.tsx

"use client";

import { Share2, Copy } from "lucide-react";

export default function ShareInvite() {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin!");
  };

  const shareWhatsApp = () => {
    const pesan = encodeURIComponent(
      "Hai! Kamu diundang ke acara pernikahan kami.\n" + url
    );
    window.open(`https://wa.me/?text=${pesan}`, "_blank");
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={shareWhatsApp}
        className="btn-primary flex items-center gap-2"
      >
        <Share2 size={18} /> Bagikan
      </button>

      <button
        onClick={copyToClipboard}
        className="btn-primary flex items-center gap-2 bg-gray-700"
      >
        <Copy size={18} /> Salin
      </button>
    </div>
  );
}
