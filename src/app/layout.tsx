// src/app/layout.tsx

"use client";

import './globals.css';
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import PageTransition from './components/PageTransition';
import SwipeLayout from './components/SwipeLayout';
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Envelope from "@/app/components/Envelope";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [guestName, setGuestName] = useState("");
  const [showContent, setShowContent] = useState(false);

  // Cek apakah halaman memerlukan envelope
  const needsEnvelope = pathname === "/" || pathname === "/home";
  
  // Cek apakah halaman adalah generator (tidak perlu layout wedding)
  const isGeneratorPage = pathname === "/generator";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('to');
    setGuestName(name || "Tamu Undangan");
    
    // Jika bukan halaman yang perlu envelope, langsung show content
    if (!needsEnvelope) {
      setShowContent(true);
    }
  }, [needsEnvelope]);

  // Jika halaman generator, render tanpa layout wedding
  if (isGeneratorPage) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#faf7f2] via-[#f7f2eb] to-[#f4ede3] text-[#4a3f35] overflow-x-hidden font-sans">
        {needsEnvelope && !showContent && (
          <Envelope
            guestName={guestName} 
            onOpen={() => setShowContent(true)} 
          />
        )}
          
        {showContent && (
          <>
            {/* Splash dan Home */}
            <Splash>
              <SwipeLayout>
                <main className="pt-14 min-h-screen md:pt-16 md:pb-4">
                  <PageTransition>
                    {children}
                    <Toaster richColors position="top-center" />
                  </PageTransition>
                </main>
              </SwipeLayout>
            </Splash>

            {/* Navbar */}
            <Navbar
              className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-[#d4af37]/30 shadow-md"
            />

            {/* Footer */}
            <footer className="text-center text-[#d4af37]/70 text-xs md:text-sm py-2">
              <span className="cursor-pointer hover:underline hover:text-[#d4af37] transition-colors duration-300">
                © 2025 by Zhafron Firdaus. All rights reserved.
              </span>
            </footer>
          </>
        )}
      </body>
    </html>
  );
}