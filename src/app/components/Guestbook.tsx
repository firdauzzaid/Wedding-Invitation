// src/app/components/Guestbook.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  CheckCircle,
  MessageCircle,
  Send,
  Heart,
} from "lucide-react";

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
      <div className="flex items-center gap-2">
        {type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        <p className="font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

/**
 * ===============================
 * MAIN COMPONENT
 * ===============================
 */
export default function Guestbook() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState<GuestbookForm>({
    name: "",
    guests: 1,
    attendance: "Hadir",
    message: "",
  });

  // Ensure component is mounted before rendering animations
  useEffect(() => {
    setMounted(true);
  }, []);

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
    // Validation
    if (!form.name.trim()) {
      showToast("Nama wajib diisi", "error");
      return;
    }

    if (form.guests < 1) {
      showToast("Jumlah tamu minimal 1", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Request failed");
      }

      showToast("Terima kasih! Konfirmasi Anda telah dikirim. 💝", "success");

      // Reset form after successful submission
      setForm({
        name: "",
        guests: 1,
        attendance: "Hadir",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      showToast("Gagal mengirim konfirmasi. Silakan coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while mounting
  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

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

      <div className="w-full space-y-8 pt-12 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center justify-center gap-6 mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Heart className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
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
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full p-4 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl focus:border-[#d4af37] focus:outline-none transition text-[#4a3f35] placeholder-[#86755a]/50"
              disabled={loading}
              required
            />
          </div>

          {/* Attendance Status */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <CheckCircle className="w-4 h-4 text-[#d4af37]" />
              Status Kehadiran <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange("attendance", "Hadir")}
                disabled={loading}
                className={`p-4 rounded-xl font-semibold transition ${
                  form.attendance === "Hadir"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#e6c85c] text-white shadow-lg"
                    : "bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 text-[#4a3f35] hover:border-[#d4af37]/50"
                }`}
              >
                ✓ Hadir
              </button>
              <button
                type="button"
                onClick={() => handleChange("attendance", "Berhalangan hadir")}
                disabled={loading}
                className={`p-4 rounded-xl font-semibold transition ${
                  form.attendance === "Berhalangan hadir"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#e6c85c] text-white shadow-lg"
                    : "bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 text-[#4a3f35] hover:border-[#d4af37]/50"
                }`}
              >
                ✗ Berhalangan
              </button>
            </div>
          </div>

          {/* Guests - Only show if attending */}
          <AnimatePresence mode="wait">
            {form.attendance === "Hadir" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
                  <Users className="w-4 h-4 text-[#d4af37]" />
                  Jumlah Tamu
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("guests", Math.max(1, form.guests - 1))
                    }
                    disabled={loading || form.guests <= 1}
                    className="w-12 h-12 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl font-bold text-[#4a3f35] hover:bg-[#d4af37] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.guests}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      handleChange("guests", Math.max(1, Math.min(10, val)));
                    }}
                    className="flex-1 p-4 text-center text-2xl font-bold bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl focus:border-[#d4af37] focus:outline-none transition text-[#4a3f35]"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("guests", Math.min(10, form.guests + 1))
                    }
                    disabled={loading || form.guests >= 10}
                    className="w-12 h-12 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl font-bold text-[#4a3f35] hover:bg-[#d4af37] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
              <MessageCircle className="w-4 h-4 text-[#d4af37]" />
              Pesan & Ucapan
              <span className="text-xs text-[#86755a] font-normal">
                (Opsional)
              </span>
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tuliskan ucapan dan doa untuk kami..."
              className="w-full p-4 bg-white/40 backdrop-blur-sm border-2 border-[#d4af37]/30 rounded-xl resize-none focus:border-[#d4af37] focus:outline-none transition text-[#4a3f35] placeholder-[#86755a]/50"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#e6c85c] rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Konfirmasi
              </>
            )}
          </motion.button>

          {/* Info Text */}
          <p className="text-xs text-center text-[#86755a] italic">
            Dengan mengirim konfirmasi ini, Anda menyetujui untuk hadir atau
            memberitahu ketidakhadiran Anda
          </p>
        </motion.div>
      </div>
    </>
  );
}
