// src/app/api/send-attendance/route.ts

import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const WAPhone = process.env.MY_PHONE;
    const token = process.env.FONNTE_API_KEY;

    const message =
`*Konfirmasi Kehadiran & Guestbook Baru*
--------------------------------------
Nama: ${body.name}
Jumlah Tamu: ${body.guests}
Status Kehadiran: ${body.attendance}
Pesan Spesial:
${body.message || "-"}
--------------------------------------
(Wedding Guest System)
`;

    await axios.post(
      "https://api.fonnte.com/send",
      {
        target: WAPhone,
        message,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error }, { status: 500 });
  }
}
