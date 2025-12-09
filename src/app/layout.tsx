// src/app/layout.tsx

"use client";

import './globals.css';
import dynamic from "next/dynamic";
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import PageTransition from './components/PageTransition';
import SwipeLayout from './components/SwipeLayout';
import { Toaster } from "sonner";

// Import GuestConfirmation secara dynamic, hanya client-side
const GuestConfirmation = dynamic(
  () => import("./components/GuestConfirmation"),
  { ssr: false }
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#faf7f2] via-[#f7f2eb] to-[#f4ede3] text-[#4a3f35] overflow-x-hidden font-sans">

        {/* Guest Confirmation floating bottom */}
        <GuestConfirmation />

        {/* Splash dan Home tetap muncul */}
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
            © 2025 by Me. All rights reserved.
          </span>
        </footer>

      </body>
    </html>
  );
}
