// src/app/components/Details.tsx
import { inter } from '../fonts';

export default function Details() {
  return (
    <section
      id="details"
      className="w-full max-w-2xl p-6 bg-white/10 backdrop-blur-md border border-[#d4af37]/30 rounded-xl shadow-lg"
    >
      <h3
        className={`${inter.className} text-2xl font-semibold text-[#d4af37] mb-4 text-center`}
      >
        Detail Acara
      </h3>

      <div className={`${inter.className} space-y-4 text-white/80`}>
        <div>
          <div className="text-sm font-medium">Akad</div>
          <div className="mt-1">Sabtu, 20 Desember 2025 • 09:00 WIB</div>
          <div className="text-sm mt-1">
            Alamat: Gedung Seruni, Jl. Mawar No.12, Jakarta
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Resepsi</div>
          <div className="mt-1">
            Sabtu, 20 Desember 2025 • 11:00 - 14:00 WIB
          </div>
          <div className="text-sm mt-1">Alamat: Ballroom Lantai 2</div>
        </div>

        <div>
          <div className="text-sm font-medium">Dresscode</div>
          <div className="mt-1">Smart Casual / Pastel</div>
        </div>

        <div className="mt-3 text-center">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-4 py-2 rounded-md border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/20 transition"
          >
            Buka Lokasi di Maps
          </a>
        </div>
      </div>
    </section>
  );
}
