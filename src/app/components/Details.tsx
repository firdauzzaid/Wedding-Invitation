// src/app/components/Details.tsx

import { inter } from "../fonts";

export default function Details() {
  return (
    <section className="w-full space-y-8">
      <h3
        className={`${inter.className} text-2xl font-semibold text-[#d4af37] mb-4 text-center`}
      >
        Detail Acara
      </h3>

      {/* AKAD */}
      <div className="text-center space-y-1">
        <h4 className={`${inter.className} text-lg font-semibold text-[#d4af37] tracking-wide`}>
          Akad Nikah
        </h4>
        <p className="text-sm text-[#4a3f35]/90">Sabtu, 20 Desember 2025 • 09:00 WIB</p>
        <p className="text-xs text-[#4a3f35]/70">
          Gedung Seruni, Jl. Mawar No.12, Jakarta
        </p>
      </div>

      {/* PEMBATAS */}
      <div className="mx-auto w-20 h-px bg-[#d4af37]/40"></div>

      {/* RESEPSI */}
      <div className="text-center space-y-1">
        <h4 className={`${inter.className} text-lg font-semibold text-[#d4af37] tracking-wide`}>
          Resepsi
        </h4>
        <p className="text-sm text-[#4a3f35]/90">
          Sabtu, 20 Desember 2025 • 11:00 – 14:00 WIB
        </p>
        <p className="text-xs text-[#4a3f35]/70">Ballroom Lantai 2</p>
      </div>

      {/* PEMBATAS */}
      <div className="mx-auto w-20 h-px bg-[#d4af37]/40"></div>

      {/* DRESSCODE */}
      <div className="text-center space-y-1">
        <h4 className={`${inter.className} text-lg font-semibold text-[#d4af37] tracking-wide`}>
          Dresscode
        </h4>
        <p className="text-sm text-[#4a3f35]/90">Smart Casual / Pastel</p>
      </div>
    </section>
  );
}
