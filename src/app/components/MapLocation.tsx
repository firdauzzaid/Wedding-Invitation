"use client";

import { MapPin } from "lucide-react";

export default function MapLocation() {
  const lat = -6.123456;
  const lng = 106.987654;

  // FREE — no API key required
  const mapsEmbed = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  // Directions button
  const mapsRoute = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="mt-6">
      <div className="w-full h-64 overflow-hidden rounded-xl shadow-lg border">
        <iframe
          src={mapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>

      <button
        onClick={() => window.open(mapsRoute, "_blank")}
        className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 shadow-md active:scale-[.98]"
      >
        <MapPin size={18} />
        Buka Rute Google Maps
      </button>
    </div>
  );
}
