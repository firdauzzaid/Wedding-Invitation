// src/app/components/Hero.tsx

import { playfair } from '../fonts';

export default function Hero() {
  return (
    <section className="relative w-full flex items-start justify-center text-center overflow-hidden pb-10">
      <div className="relative z-10 px-4 flex flex-col items-center">

        {/* Bismillah PNG */}
        <img
          src="/images/bismillah.png"
          alt="Bismillah"
          className="w-40 md:w-52 opacity-90"
        />

        {/* Nama pengantin dengan jarak besar */}
        <h1
          className={`${playfair.className}
            text-4xl md:text-6xl
            font-bold
            text-[#d4af37]
            drop-shadow-lg
            leading-[1.3]
            mt-6 md:mt-12
            mb-4 md:mb-6
          `}
        >
          <span className="block mb-3">Zhafron Firdaus</span>
          <span className="block text-3xl md:text-4xl mb-3">&amp;</span>
          <span className="block mt-3">Annisa Zahra</span>
        </h1>

      </div>
    </section>
  );
}
