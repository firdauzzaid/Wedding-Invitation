// src/app/components/Guestbook.tsx

"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function GuestConfirmationPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    guests: 1,
    attendance: "Hadir",
    message: "",
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name) return toast.error("Nama wajib diisi");

    setLoading(true);
    try {
      const res = await fetch("/api/send-attendance", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Terima kasih! Pesan Anda telah dikirim.");
      setForm({ name: "", guests: 1, attendance: "Hadir", message: "" });
    } catch (err) {
      toast.error("Gagal mengirim, coba lagi.");
    }
    setLoading(false);
  };

  return (
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-[#e4dac7]">

        <h1 className="text-2xl font-serif text-center mb-2 text-[#6f5e4e]">
          Konfirmasi Kehadiran
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Silakan isi formulir di bawah ini
        </p>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium text-gray-700">Nama</label>
            <input
              type="text"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#d4af37]"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Jumlah Tamu</label>
            <input
              type="number"
              min={1}
              className="w-full p-3 border rounded-xl"
              value={form.guests}
              onChange={(e) => handleChange("guests", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Kehadiran</label>
            <select
              className="w-full p-3 border rounded-xl"
              value={form.attendance}
              onChange={(e) => handleChange("attendance", e.target.value)}
            >
              <option>Hadir</option>
              <option>Berhalangan hadir</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Pesan Spesial / Guestbook
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border rounded-xl"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#d4af37] to-[#b8913f] text-white rounded-xl font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim ke WhatsApp"}
          </button>

        </div>
      </div>
    
  );
}
