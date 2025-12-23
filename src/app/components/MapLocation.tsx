// src/app/components/MapLocation.tsx

"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const playfairStyle = {
  fontFamily: 'Playfair Display, serif'
};

export default function MapLocation() {
  const lat = -7.8057640497607235;
  const lng = 110.36526644065994;
  
  const mapsEmbed = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const mapsRoute = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
          <MapPin className="w-5 h-5 text-[#d4af37]" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>
        
        <h3
          className="text-3xl font-bold text-[#4a3f35] tracking-wide"
          style={playfairStyle}
        >
          Lokasi Acara
        </h3>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow-xl border-2 border-[#d4af37]/30 group">
        {/* Decorative corners on hover */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <iframe
          src={mapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Direction Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.open(mapsRoute, "_blank")}
        className="w-full bg-gradient-to-r from-[#d4af37] via-[#e6c85c] to-[#d4af37] 
                   text-[#1f2937] font-semibold py-4 rounded-xl shadow-lg
                   flex items-center justify-center gap-3 transition-all duration-300
                   hover:shadow-xl relative overflow-hidden group"
      >
        <MapPin size={20} className="relative z-10" />
        <span className="relative z-10 tracking-wide">Buka Rute Google Maps</span>
        
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {/* Info Text */}
      <p className="text-xs text-center text-[#86755a] italic">
        Klik tombol di atas untuk membuka navigasi
      </p>
    </motion.div>
  );
}
