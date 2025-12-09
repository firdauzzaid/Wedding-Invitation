// src/app/components/GuestConfirmation.tsx

"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface FormData {
  name: string;
  guests: number;
  attendance: "Hadir" | "Berhalangan hadir";
  note: string;
}

interface GuestConfirmationProps {
  onDone?: () => void;
}

export default function GuestConfirmation({ onDone }: GuestConfirmationProps) {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    guests: 1,
    attendance: "Hadir",
    note: "",
  });
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) setHideOnScroll(true);
      else setHideOnScroll(false);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const finish = () => {
    setVisible(false);
    localStorage.setItem("guestConfirmationSeen", "true");
    if (onDone) onDone();
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/send-attendance", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("Konfirmasi kehadiran berhasil dikirim");
      finish();
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim data, coba lagi");
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[999] w-11/12 max-w-md transition-all duration-500 ease-in-out
      ${expanded ? "translate-y-0 opacity-100" : hideOnScroll ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <div className="bg-gradient-to-r from-[#f9f2e7] to-[#f4e5d3] shadow-2xl rounded-2xl overflow-hidden font-fonnte border border-[#e0cfa5]">
        {/* Header bar */}
        <div
          className="flex justify-between items-center px-5 py-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-semibold text-gray-800 text-lg">Konfirmasi Kehadiran</span>
          {expanded ? (
            <FaChevronDown className="text-gray-600 animate-bounce" />
          ) : (
            <FaChevronUp className="text-gray-600 animate-bounce" />
          )}
        </div>

        {/* Form */}
        {expanded && (
          <div className="p-5 border-t border-[#e0cfa5] space-y-3 bg-white rounded-b-2xl">
            <input
              type="text"
              placeholder="Nama"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Jumlah Tamu"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] outline-none"
              value={formData.guests}
              min={1}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
            />
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] outline-none"
              value={formData.attendance}
              onChange={(e) =>
                setFormData({ ...formData, attendance: e.target.value as "Hadir" | "Berhalangan hadir" })
              }
            >
              <option value="Hadir">Hadir</option>
              <option value="Berhalangan hadir">Berhalangan hadir</option>
            </select>
            <textarea
              placeholder="Catatan (opsional)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] outline-none"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
            <button
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8913f] text-white rounded-xl font-semibold hover:from-[#b8913f] hover:to-[#d4af37] transition-colors"
              onClick={handleSubmit}
            >
              Kirim & Lanjut
            </button>
            <button
              className="w-full py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              onClick={finish}
            >
              Lewati
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
