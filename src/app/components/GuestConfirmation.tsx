// src/app/components/GuestConfirmation.tsx

"use client";

import { useEffect, useState } from "react";

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
  const [step, setStep] = useState<"prompt" | "form" | "done">("prompt");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    guests: 1,
    attendance: "Hadir",
    note: "",
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("guestConfirmationSeen");
    if (seen) finish(); // client-only
  }, []);

  const finish = () => setFadeOut(true);

  const handleAnimationEnd = () => {
    if (fadeOut) {
      setStep("done");
      if (onDone) onDone();
    }
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/send-attendance", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      localStorage.setItem("guestConfirmationSeen", "true");
      finish();
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim data, coba lagi.");
    }
  };

  if (step === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 ${
        fadeOut ? "fade-out" : "fade-in"
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {step === "prompt" && (
        <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg font-fonnte">
          <p className="text-lg font-semibold mb-4">Konfirmasi Kehadiran</p>
          <p className="mb-4">Apakah Anda ingin mengisi konfirmasi kehadiran?</p>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setStep("form")}
            >
              Ya
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={finish}
            >
              Tidak
            </button>
          </div>
        </div>
      )}

      {step === "form" && (
        <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg font-fonnte">
          <p className="text-lg font-semibold mb-4 text-center">
            Form Konfirmasi Kehadiran
          </p>
          <input
            type="text"
            placeholder="Nama"
            className="mb-2 w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Jumlah Tamu"
            className="mb-2 w-full p-2 border rounded"
            value={formData.guests}
            min={1}
            onChange={(e) =>
              setFormData({ ...formData, guests: parseInt(e.target.value) })
            }
          />
          <select
            className="mb-2 w-full p-2 border rounded"
            value={formData.attendance}
            onChange={(e) =>
              setFormData({
                ...formData,
                attendance: e.target.value as "Hadir" | "Berhalangan hadir",
              })
            }
          >
            <option value="Hadir">Hadir</option>
            <option value="Berhalangan hadir">Berhalangan hadir</option>
          </select>
          <textarea
            placeholder="Catatan (opsional)"
            className="mb-2 w-full p-2 border rounded"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
            onClick={handleSubmit}
          >
            Kirim & Lanjut
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
        .fade-in { animation: fadeIn 0.4s forwards; }
        .fade-out { animation: fadeOut 0.4s forwards; }
      `}</style>
    </div>
  );
}
