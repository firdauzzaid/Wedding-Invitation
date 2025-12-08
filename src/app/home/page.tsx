// src/app/home/page.tsx

import Hero from "@/app/components/Hero";
import Countdown from "@/app/components/Countdown";

export default function Page() {
  return (
    <div className="
      min-h-screen 
      pt-4 pb-20 px-4 
      max-w-xl mx-auto 
      flex 
      justify-start
    ">
      
      {/* SINGLE CARD FULL HEIGHT */}
      <div
        className="
          glass rounded-2xl p-6 shadow-xl space-y-10 
          w-full
          min-h-[calc(100vh-150px)]
          flex flex-col
          justify-start
        "
      >
        <Hero />
        <Countdown />
      </div>

    </div>
  );
}
