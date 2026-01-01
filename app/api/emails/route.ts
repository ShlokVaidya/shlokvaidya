import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, body } = await req.json();

  if (!subject || !body) {
    return NextResponse.json(
      { error: "Subject and body are required." },
      { status: 400 }
    );
  }

  const res = await fetch("https://api.buttondown.com/v1/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${process.env.BUTTONDOWN_API_KEY}`,
    },
    body: JSON.stringify({ subject, body }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
