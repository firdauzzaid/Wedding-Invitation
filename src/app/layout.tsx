// src/app/layout.tsx

"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import PageTransition from "./components/PageTransition";
import SwipeLayout from "./components/SwipeLayout";
import { Toaster } from "sonner";
import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Envelope from "@/app/components/Envelope";

// Context untuk menyimpan data undangan
interface InvitationContextType {
  guestName: string;
  invitationCode: string | null;
  isVIP: boolean;
}

const InvitationContext = createContext<InvitationContextType>({
  guestName: "",
  invitationCode: null,
  isVIP: false,
});

// Hook untuk mengakses context
export const useInvitation = () => useContext(InvitationContext);

// Daftar kode VIP (sinkronkan dengan Hero.tsx)
const VIP_CODES = ["VIP001", "VIP002", "VIP003", "SPECIAL01", "SPECIAL02"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [guestName, setGuestName] = useState("");
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [isVIP, setIsVIP] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cek apakah halaman memerlukan envelope
  const needsEnvelope = pathname === "/" || pathname === "/home";

  // Cek apakah halaman adalah generator (tidak perlu layout wedding)
  const isGeneratorPage = pathname === "/generator";

  useEffect(() => {
    setMounted(true);

    // Cek URL params
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get("to");
    const codeFromUrl = params.get("code");

    // Cek sessionStorage untuk data yang sudah tersimpan
    const savedName = sessionStorage.getItem("guestName");
    const savedCode = sessionStorage.getItem("invitationCode");
    const savedVIPStatus = sessionStorage.getItem("isVIP");

    // Prioritas: URL params > sessionStorage
    const finalName = nameFromUrl || savedName || "Tamu Undangan";
    const finalCode = codeFromUrl || savedCode || null;

    // Set state
    setGuestName(finalName);
    setInvitationCode(finalCode);

    // Cek apakah VIP
    let vipStatus = false;
    if (finalCode && VIP_CODES.includes(finalCode.toUpperCase())) {
      vipStatus = true;
    } else if (savedVIPStatus === "true") {
      vipStatus = true;
    }

    setIsVIP(vipStatus);

    // Simpan ke sessionStorage agar persist saat refresh
    sessionStorage.setItem("guestName", finalName);
    if (finalCode) {
      sessionStorage.setItem("invitationCode", finalCode);
    }
    sessionStorage.setItem("isVIP", vipStatus.toString());

    // Jika bukan halaman yang perlu envelope, langsung show content
    if (!needsEnvelope) {
      setShowContent(true);
    }
  }, [needsEnvelope, pathname]);

  // Jika halaman generator, render tanpa layout wedding
  if (isGeneratorPage) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  // Context value
  const invitationContextValue = {
    guestName,
    invitationCode,
    isVIP,
  };

  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-b from-[#faf7f2] via-[#f7f2eb] to-[#f4ede3] text-[#4a3f35] overflow-x-hidden font-sans">
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#faf7f2] via-[#f7f2eb] to-[#f4ede3] text-[#4a3f35] overflow-x-hidden font-sans">
        <InvitationContext.Provider value={invitationContextValue}>
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
              <Navbar className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-[#d4af37]/30 shadow-md" />

              {/* Footer */}
              <footer className="text-center text-[#d4af37]/70 text-xs md:text-sm py-2">
                <span className="cursor-pointer hover:underline hover:text-[#d4af37] transition-colors duration-300">
                  ©️ 2025 by Zhafron Firdaus. All rights reserved.
                </span>
              </footer>
            </>
          )}
        </InvitationContext.Provider>
      </body>
    </html>
  );
}
