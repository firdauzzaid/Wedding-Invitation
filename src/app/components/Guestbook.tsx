// src/app/components/Guestbook.tsx

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Users, CheckCircle, MessageCircle, Send } from "lucide-react";

// Font configuration
const playfairStyle = {
  fontFamily: 'Playfair Display, serif'
};

// Toast notification component (simple version)
function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-xl backdrop-blur-md
                  ${type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}
    >
      <p className="font-medium">{message}</p>
    </motion.div>
  );
}

// Main Guestbook Component
export default function Guestbook() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    name: "",
    guests: 1,
    attendance: "Hadir",
    message: "",
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name) {
      showToast("Nama wajib diisi", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      showToast("Terima kasih! Konfirmasi Anda telah dikirim.", "success");
      setForm({ name: "", guests: 1, attendance: "Hadir", message: "" });
    } catch (err) {
      showToast("Gagal mengirim, coba lagi.", "error");
    }
    setLoading(false);
  };

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="w-full space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
            <MessageCircle className="w-6 h-6 text-[#d4af37]" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h1
            className="text-3xl font-bold text-[#4a3f35] tracking-wide mb-2"
            style={playfairStyle}
          >
            Konfirmasi Kehadiran
          </h1>

          <p className="text-sm text-[#86755a] italic">
            Kehadiran Anda adalah kebahagiaan bagi kami
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          {/* Name Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <User className="w-4 h-4 text-[#d4af37]" />
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              className="w-full p-4 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 
                       rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]
                       transition-all duration-300 text-[#4a3f35] placeholder:text-[#86755a]/50"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <Users className="w-4 h-4 text-[#d4af37]" />
              Jumlah Tamu
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleChange("guests", Math.max(1, form.guests - 1))}
                className="w-12 h-12 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 
                         rounded-xl font-bold text-[#4a3f35] hover:bg-[#d4af37]/10 
                         transition-all duration-300 hover:scale-105"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                className="flex-1 p-4 text-center bg-white/40 backdrop-blur-sm border-2 
                         border-[#d4af37]/30 rounded-xl font-bold text-lg text-[#4a3f35]
                         focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                value={form.guests}
                onChange={(e) => handleChange("guests", Number(e.target.value))}
              />
              <button
                onClick={() => handleChange("guests", form.guests + 1)}
                className="w-12 h-12 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 
                         rounded-xl font-bold text-[#4a3f35] hover:bg-[#d4af37]/10 
                         transition-all duration-300 hover:scale-105"
              >
                +
              </button>
            </div>
          </div>

          {/* Attendance Status */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <CheckCircle className="w-4 h-4 text-[#d4af37]" />
              Status Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleChange("attendance", "Hadir")}
                className={`p-4 rounded-xl font-semibold transition-all duration-300
                          ${form.attendance === "Hadir"
                            ? 'bg-gradient-to-r from-[#d4af37] to-[#e6c85c] text-white shadow-lg scale-105'
                            : 'bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 text-[#4a3f35] hover:bg-[#d4af37]/10'
                          }`}
              >
                ✓ Hadir
              </button>
              <button
                onClick={() => handleChange("attendance", "Berhalangan hadir")}
                className={`p-4 rounded-xl font-semibold transition-all duration-300
                          ${form.attendance === "Berhalangan hadir"
                            ? 'bg-gradient-to-r from-[#d4af37] to-[#e6c85c] text-white shadow-lg scale-105'
                            : 'bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 text-[#4a3f35] hover:bg-[#d4af37]/10'
                          }`}
              >
                ✗ Berhalangan
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <MessageCircle className="w-4 h-4 text-[#d4af37]" />
              Pesan & Ucapan
            </label>
            <textarea
              rows={5}
              placeholder="Tulis ucapan dan doa untuk kami..."
              className="w-full p-4 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 
                       rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]
                       transition-all duration-300 text-[#4a3f35] placeholder:text-[#86755a]/50
                       resize-none"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#e6c85c] to-[#d4af37] 
                     text-[#1f2937] font-bold rounded-xl shadow-xl
                     flex items-center justify-center gap-3 transition-all duration-300
                     hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed
                     relative overflow-hidden group text-lg"
          >
            <Send size={20} className="relative z-10" />
            <span className="relative z-10 tracking-wide">
              {loading ? "Mengirim..." : "Kirim Konfirmasi"}
            </span>

            {!loading && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>

          {/* Info Text */}
          <p className="text-xs text-center text-[#86755a] italic mt-4">
            Konfirmasi akan dikirim melalui WhatsApp
          </p>
        </motion.div>
      </div>
    </>
  );
}
