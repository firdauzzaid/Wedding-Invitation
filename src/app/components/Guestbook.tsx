// src/app/components/Guestbook.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, CheckCircle, MessageCircle, Send } from "lucide-react";

/**
 * ===============================
 * TYPES
 * ===============================
 */
type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

interface GuestbookForm {
  name: string;
  guests: number;
  attendance: "Hadir" | "Berhalangan hadir";
  message: string;
}

interface ToastState {
  message: string;
  type: ToastType;
}

/**
 * ===============================
 * STYLES
 * ===============================
 */
const playfairStyle: React.CSSProperties = {
  fontFamily: "Playfair Display, serif",
};

/**
 * ===============================
 * TOAST COMPONENT
 * ===============================
 */
function Toast({ message, type, onClose }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-xl backdrop-blur-md
        ${
          type === "success"
            ? "bg-green-500/90 text-white"
            : "bg-red-500/90 text-white"
        }`}
      onClick={onClose}
    >
      <p className="font-medium">{message}</p>
    </motion.div>
  );
}

/**
 * ===============================
 * MAIN COMPONENT
 * ===============================
 */
export default function Guestbook() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState<GuestbookForm>({
    name: "",
    guests: 1,
    attendance: "Hadir",
    message: "",
  });

  /**
   * ===============================
   * HELPERS
   * ===============================
   */
  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = <K extends keyof GuestbookForm>(
    key: K,
    value: GuestbookForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
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

      if (!res.ok) throw new Error("Request failed");

      showToast("Terima kasih! Konfirmasi Anda telah dikirim.", "success");
      setForm({
        name: "",
        guests: 1,
        attendance: "Hadir",
        message: "",
      });
    } catch {
      showToast("Gagal mengirim, coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ===============================
   * RENDER
   * ===============================
   */
  return (
    <>
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

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

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <User className="w-4 h-4 text-[#d4af37]" />
              Nama Lengkap
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full p-4 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl"
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <Users className="w-4 h-4 text-[#d4af37]" />
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              value={form.guests}
              onChange={(e) =>
                handleChange("guests", Number(e.target.value))
              }
              className="w-full p-4 text-center bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <MessageCircle className="w-4 h-4 text-[#d4af37]" />
              Pesan & Ucapan
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full p-4 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#e6c85c] rounded-xl font-bold"
          >
            {loading ? "Mengirim..." : "Kirim Konfirmasi"}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
