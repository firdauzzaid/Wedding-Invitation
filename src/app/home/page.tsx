// src/app/home/page.tsx

import Hero from "@/app/components/Hero";
import Countdown from "@/app/components/Countdown";

export default function Page() {
  return (
    <div className="px-4 pt-6 pb-24 max-w-xl mx-auto fade-in">
      <div className="glass rounded-2xl p-6 shadow-xl">
        <Hero />
      </div>

      <div className="mt-8">
        <div className="glass rounded-2xl p-6 shadow-xl">
        <Countdown />
      </div>
      </div>
    </div>
  );
}
