// src/app/components/Guestbook.tsx
import { inter } from '../fonts';

export default function Guestbook() {
  return (
    <section className="py-14 px-6 w-full flex flex-col items-center">
      <h2
        className={`${inter.className} text-2xl font-bold text-[#d4af37] mb-6`}
      >
        Buku Tamu
      </h2>

      <form className="w-full max-w-md space-y-4 bg-white/10 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-6 shadow-lg">
        <input
          type="text"
          placeholder="Nama"
          className={`${inter.className} w-full px-3 py-2 rounded-md bg-white/20 border border-[#d4af37]/50 text-white focus:outline-none focus:border-[#d4af37]/80`}
        />
        <textarea
          placeholder="Ucapan"
          className={`${inter.className} w-full px-3 py-2 rounded-md bg-white/20 border border-[#d4af37]/50 text-white h-24 resize-none focus:outline-none focus:border-[#d4af37]/80`}
        ></textarea>
        <button
          className={`${inter.className} w-full py-2 rounded-md bg-[#d4af37] text-black shadow-lg hover:shadow-xl transition`}
        >
          Kirim Ucapan
        </button>
      </form>

      {/* Dummy messages */}
      <div className="w-full max-w-md mt-6 space-y-3">
        <div className="bg-white/10 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-4">
          <div className="font-semibold text-white">Adit</div>
          <div className="text-white/80 text-sm">
            Semoga langgeng dan bahagia selalu!
          </div>
        </div>
      </div>
    </section>
  );
}
