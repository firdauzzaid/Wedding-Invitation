// src/app/api/send-attedance/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Format pesan
    const message = `
Nama: ${data.name}
Jumlah Tamu: ${data.guests}
Kehadiran: ${data.attendance}
Catatan: ${data.note || "-"}
    `;

    // Kirim ke Fonnte API
    await axios.post(
      "https://api.fonnte.com/send", 
      {
        to: process.env.MY_PHONE!,
        message,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.FONNTE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Gagal mengirim via Fonnte:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
