// src/app/components/RSVP.tsx
'use client';
import { useState } from 'react';
import { inter } from '../fonts';

export default function RSVP() {
  const [name, setName] = useState('');
  const [attend, setAttend] = useState<'Hadir' | 'Berhalangan'>('Hadir');
  const [guestCount, setGuestCount] = useState(1);

  const handleSend = () => {
    const subject = encodeURIComponent(
      'Konfirmasi Kehadiran - Undangan Zhafron & Annisa'
    );
    const body = encodeURIComponent(
      `Nama: ${name}\nKehadiran: ${attend}\nJumlah Tamu: ${guestCount}`
    );
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="w-full flex flex-col items-center justify-center px-6 py-16">
      <h3
        className={`${inter.className} text-2xl font-semibold text-[#d4af37] mb-8 text-center`}
      >
        Konfirmasi Kehadiran
      </h3>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-6 space-y-6 shadow-lg">
        <div>
          <label
            className={`${inter.className} block text-sm mb-1 text-white/70`}
          >
            Nama
          </label>
          <input
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            className={`${inter.className} w-full rounded-md p-3 text-sm bg-white/20 border border-[#d4af37]/50 text-white focus:outline-none focus:border-[#d4af37]/80`}
          />
        </div>

        <div>
          <label
            className={`${inter.className} block text-sm mb-1 text-white/70`}
          >
            Kehadiran
          </label>
          <select
            defaultValue={attend}
            onChange={(e) => setAttend(e.target.value as any)}
            className={`${inter.className} w-full rounded-md p-3 text-sm bg-white/20 border border-[#d4af37]/50 text-white focus:outline-none focus:border-[#d4af37]/80`}
          >
            <option>Hadir</option>
            <option>Berhalangan</option>
          </select>
        </div>

        <div>
          <label
            className={`${inter.className} block text-sm mb-1 text-white/70`}
          >
            Jumlah Tamu
          </label>
          <input
            type="number"
            min={0}
            defaultValue={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className={`${inter.className} w-full rounded-md p-3 text-sm bg-white/20 border border-[#d4af37]/50 text-white focus:outline-none focus:border-[#d4af37]/80`}
          />
        </div>

        <button
          onClick={handleSend}
          className={`${inter.className} w-full py-3 rounded-md font-semibold bg-[#d4af37] text-black shadow-lg hover:shadow-xl transition`}
        >
          Kirim Konfirmasi
        </button>
      </div>
    </section>
  );
}
