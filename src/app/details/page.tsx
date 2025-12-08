// src/app/details/page.tsx

import Details from "@/app/components/Details";
import MapLocation from "@/app/components/MapLocation";

export default function Page() {
  return (
    <div className="px-4 py-8 fade-in">
      {/* CARD UTAMA */}
      <div className="glass rounded-3xl shadow-xl p-6 md:p-10 space-y-10">

        {/* SECTION: DETAILS */}
        <section>
          <Details />
        </section>

        {/* GARIS PEMISAH */}
        <div className="border-t border-[#e6d8b7]/40"></div>

        {/* SECTION: MAP */}
        <section>
          <MapLocation />
        </section>
      </div>
    </div>
  );
}
