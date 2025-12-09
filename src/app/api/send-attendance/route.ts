// src/app/api/send-attendance/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: NextRequest) {
  try {
    const { name, guests, attendance, note } = await req.json();

    const message = `
Nama: ${name}
Jumlah Tamu: ${guests}
Kehadiran: ${attendance}
Catatan: ${note || "-"}
    `.trim();

    const form = new FormData();
    form.append("target", process.env.MY_PHONE!);
    form.append("message", message);
    form.append("countryCode", "62");

    const resp = await axios.post("https://api.fonnte.com/send", form, {
      headers: {
        Authorization: process.env.FONNTE_API_KEY!,
        ...form.getHeaders(),
      },
    });

    return NextResponse.json({ success: true, data: resp.data });
  } catch (err: any) {
    console.error("Gagal mengirim via Fonnte:", err.response?.data || err.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
