// src/app/components/Hero.tsx

import { playfair, inter, arabic } from '../fonts';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <div className="relative z-10 px-4">

        {/* Bismillah Arabic */}
        <h2
          className={`${arabic.className} text-3xl md:text-4xl text-[#d4af37] mb-20 leading-relaxed tracking-wide`}
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h2>

        {/* Bismillah Image */}
        {/* <div className="flex justify-center mb-6">
          <img
            src="/bismillah.png"
            alt="Bismillah"
            className="w-40 md:w-48 object-contain opacity-90"
          />
        </div> */}

        {/* Nama pengantin */}
        <h1
          className={`${playfair.className} text-4xl md:text-6xl font-bold text-[#d4af37] drop-shadow-lg leading-tight`}
        >
          Zhafron Firdaus
          <br />&<br />
          Annisa Zahra
        </h1>

        {/* Deskripsi */}
        <p
          className={`${inter.className} text-black mt-4 text-sm md:text-base tracking-wide`}
        >
          Kami mengundang Anda ke hari spesial kami
        </p>

        {/* Button */}
        <a
          href="#details"
          className="inline-block mt-8 bg-[#d4af37] text-black px-6 py-2 rounded-full font-semibold shadow-lg text-sm hover:shadow-xl transition"
        >
          Lihat Undangan
        </a>
      </div>
    </section>
  );
}
