// src/app/components/Envelope.tsx

"use client";

import Image from "next/image";
import React, { useState } from "react";

interface EnvelopeProps {
  guestName: string;
  onOpen: () => void;
}

function Envelope({ guestName, onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/BG-Wedding.png"
          alt="Wedding"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b9370]/30 via-black/10 to-[#6b7353]/40 animate-pulse" 
             style={{ animationDuration: '5s' }} />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      {/* Mobile Container */}
      <div className="relative flex flex-col w-full max-w-md min-h-screen backdrop-blur-sm overflow-hidden z-10">
        {/* Background Dalam Container */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/BG-Wedding.png"
            alt="Wedding"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 gap-10">
          {/* Title Above Envelope */}
          <div className="text-center space-y-4 animate-fade-in">
            {/* Ornament Top */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-[#d4af37]/60" />
              <svg className="w-7 h-7 text-[#d4af37] drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/50 to-[#d4af37]/60" />
            </div>

            <h1 className="text-5xl md:text-6xl font-serif italic tracking-wider text-white drop-shadow-2xl">
              Undangan Pernikahan
            </h1>

            {/* Ornament Bottom */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-[#d4af37]/50" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rotate-45 bg-white/70 shadow-lg" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]/70 shadow-lg" />
                <div className="w-1.5 h-1.5 rotate-45 bg-white/70 shadow-lg" />
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-white/40 to-[#d4af37]/50" />
            </div>
          </div>

          {/* Envelope Container */}
          <div className="relative w-full max-w-xs">
            {/* Envelope */}
            <div
              className={`relative transition-all duration-1000 ${
                isOpen 
                  ? "scale-110 opacity-0 translate-y-[-50px]" 
                  : "scale-100 opacity-100"
              }`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-b from-[#d4af37]/20 via-white/10 to-[#8b9370]/20 rounded-3xl blur-2xl transition-all duration-700 ${
                isHovering ? "opacity-80 scale-110" : "opacity-40"
              }`} />

              {/* Envelope Body */}
              <div className="relative bg-gradient-to-br from-white/40 via-white/25 to-[#8b9370]/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/30">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 2px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Shimmer overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${
                  isHovering ? "opacity-100" : "opacity-0"
                }`} style={{ 
                  transform: 'translateX(-100%)',
                  animation: isHovering ? 'shimmer 2s infinite' : 'none'
                }} />

                {/* Top Section - Envelope Flap Area */}
                <div className="relative pt-14 pb-24 px-5 text-center">
                  {/* Decorative Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                  {/* Envelope Flap Effect */}
                  <div
                    className={`absolute top-0 left-0 right-0 transition-all duration-1000 origin-top ${
                      isOpen
                        ? "-translate-y-4 rotate-[-180deg] opacity-0"
                        : "translate-y-0 rotate-0 opacity-100"
                    }`}
                    style={{ transformOrigin: "top center" }}
                  >
                    <svg
                      viewBox="0 0 320 100"
                      className="w-full drop-shadow-2xl"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="flapGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" style={{ stopColor: "#8b9370", stopOpacity: 0.6 }} />
                          <stop offset="50%" style={{ stopColor: "#6b7353", stopOpacity: 0.7 }} />
                          <stop offset="100%" style={{ stopColor: "#5a6147", stopOpacity: 0.8 }} />
                        </linearGradient>
                        <filter id="shadow">
                          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.4"/>
                        </filter>
                      </defs>
                      <polygon
                        points="0,0 160,70 320,0 320,15 160,85 0,15"
                        fill="url(#flapGradient)"
                        filter="url(#shadow)"
                      />
                      <polygon
                        points="0,0 160,70 320,0"
                        className="fill-white opacity-10"
                      />
                    </svg>

                    {/* Wax Seal - Enhanced */}
                    {!isOpen && (
                      <div className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                        isHovering ? "scale-115 rotate-12" : "scale-100 rotate-0"
                      }`}>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-[#d4af37] via-amber-600 to-amber-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20">
                          {/* Multiple glow layers */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/40 to-transparent rounded-full blur-md" />
                          <div className="absolute inset-2 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full" />
                          
                          <svg
                            className="w-8 h-8 text-white relative z-10 animate-pulse drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{ animationDuration: '2.5s' }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          
                          {/* Animated ring */}
                          <div className="absolute inset-0 rounded-full border-2 border-yellow-300/40 animate-ping" 
                               style={{ animationDuration: '2.5s' }} />
                          <div className="absolute inset-[-4px] rounded-full border border-yellow-200/20" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Section - White Card with Glass Effect */}
                <div className="relative bg-gradient-to-b from-white/90 via-white/85 to-gray-50/90 backdrop-blur-md pt-8 pb-12 px-6 text-center rounded-b-2xl shadow-inner border-t border-white/40">
                  {/* Decorative corners - Gold themed */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[#d4af37]/40 rounded-tl-xl" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-[#d4af37]/40 rounded-tr-xl" />
                  
                  {/* Bismillah Image */}
                  <div className="flex items-center justify-center">
                    <div className="w-56 h-32 mx-auto overflow-hidden">
                      <img
                        src="/images/bismillah.png"
                        alt="Bismillah"
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className="space-y-4 mb-7">
                    <p className="text-gray-600 text-sm font-light tracking-wide">
                      kami mengundang
                    </p>

                    <div className="py-3">
                      <p className="text-gray-500 text-[11px] mb-1 tracking-widest uppercase font-medium">
                        Kepada YTH.
                      </p>
                      <p className="text-gray-400 text-xs mb-3 italic">
                        Bapak/Ibu/Saudara/i
                      </p>
                      <div className="inline-block relative px-1">
                        {/* Animated underline */}
                        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#8b9370] via-[#d4af37] to-[#8b9370] rounded-full shadow-sm" />
                        <p className="text-2xl font-bold text-[#6b7353] px-4 py-2 tracking-wide drop-shadow-sm">
                          {guestName}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                      Untuk menghadiri acara pernikahan kami
                    </p>
                  </div>

                  {/* Date with enhanced decoration */}
                  <div className="mb-7 relative">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8b9370]/15 via-[#d4af37]/10 to-[#8b9370]/15 px-8 py-3 rounded-full border border-[#8b9370]/20 shadow-sm">
                      <p className="text-[#6b7353] font-bold tracking-[0.25em] text-lg">
                        02.01.2026
                      </p>
                    </div>
                  </div>

                  {/* Open Button - Enhanced */}
                  <button
                    onClick={handleOpen}
                    disabled={isOpen}
                    className="group relative bg-gradient-to-r from-[#8b9370] via-[#7a8360] to-[#6b7353] text-white font-bold py-4 px-12 rounded-full shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden border border-white/20"
                  >
                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                    
                    <svg
                      className={`w-6 h-6 relative z-10 transition-transform duration-500 ${isHovering ? "rotate-[-10deg] scale-110" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                      />
                    </svg>
                    <span className="relative z-10 tracking-wide">
                      {isOpen ? "Membuka..." : "Buka Undangan"}
                    </span>
                  </button>

                  {/* Decorative bottom corners */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-[#d4af37]/40 rounded-bl-xl" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[#d4af37]/40 rounded-br-xl" />
                </div>
              </div>
            </div>

            {/* Status Text */}
            {isOpen && (
              <div className="text-center mt-10 animate-fade-in">
                <div className="inline-flex items-center gap-3 text-white text-sm bg-gradient-to-r from-[#8b9370]/90 via-[#7a8360]/90 to-[#6b7353]/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border border-white/30">
                  <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-semibold tracking-wide">Membuka undangan...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% { 
            opacity: 0.6;
            transform: translateY(-50vh) translateX(20px) rotate(180deg);
          }
          75% {
            opacity: 0.3;
          }
          100% { 
            transform: translateY(-100vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}

export default Envelope;