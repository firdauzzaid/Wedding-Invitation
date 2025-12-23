// src/app/components/Details.tsx

"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

const playfairStyle = {
  fontFamily: "Playfair Display, serif",
};

export default function Details() {
  const events = [
    {
      title: "Akad Nikah",
      date: "Jumat, 2 Januari 2026",
      time: "09:00 WIB",
      location: "Gedung Seruni",
      address: "Jl. Mawar No.12, Jakarta",
      icon: "🤲",
    },
    {
      title: "Resepsi",
      date: "Jumat, 2 Januari 2026",
      time: "11:00 – 14:00 WIB",
      location: "Ballroom Lantai 2",
      address: "Gedung Seruni, Jakarta",
      icon: "💐",
    },
  ];

  return (
    <section className="w-full space-y-8 pt-12 pb-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center flex flex-col items-center justify-center gap-6 mb-6"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
          <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        <div>
          <h3
            className="text-3xl font-bold text-[#4a3f35] tracking-wide"
            style={playfairStyle}
          >
            Detail Acara
          </h3>

          <p className="text-sm text-[#86755a] mt-2 italic">
            Dengan memohon rahmat dan ridho Allah SWT
          </p>
        </div>
      </motion.div>

      {/* Event Cards */}
      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-2xl border border-[#d4af37]/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col items-center gap-4"
          >
            {/* Icon */}
            <div className="text-4xl mb-3 text-center">{event.icon}</div>

            {/* Title */}
            <h4
              className="text-2xl font-bold text-[#4a3f35] text-center mb-4"
              style={playfairStyle}
            >
              {event.title}
            </h4>

            {/* Details */}
            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#4a3f35] font-medium">
                  {event.date}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#4a3f35] font-medium">
                  {event.time}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 justify-center">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
                <div className="text-center">
                  <p className="text-sm text-[#4a3f35] font-semibold">
                    {event.location}
                  </p>
                  <p className="text-xs text-[#86755a]">{event.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
