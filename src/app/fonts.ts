// src/app/fonts.ts

import { Playfair_Display, Inter } from 'next/font/google';
import { Scheherazade_New } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const arabic = Scheherazade_New({
  subsets: ["arabic"],
  weight: "700",
});
export const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });
