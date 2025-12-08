// src/app/layout.tsx

import './globals.css';
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import PageTransition from './components/PageTransition';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#faf7f2] via-[#f7f2eb] to-[#f4ede3] text-[#4a3f35] overflow-x-hidden font-sans">
        {/* Splash screen */}
        <Splash>
          <main className="pt-16 pb-20 min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
        </Splash>

        {/* Navbar */}
        <Navbar className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-[#d4af37]/30 shadow-md" />

        {/* Footer */}
        <footer className="text-center text-[#d4af37]/70 text-xs md:text-sm leading-relaxed px-4 py-6">
          Kehadiran Anda sangat berarti bagi kami • Mohon dapat hadir tepat waktu
        </footer>
      </body>
    </html>
  );
}