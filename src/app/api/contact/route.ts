import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, honeypot } = await req.json();

    if (!process.env.RESEND_API_KEY)
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });

    if (honeypot) return NextResponse.json({ error: "Bot detected" }, { status: 400 });

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim())
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    if (message.trim().length < 10)
      return NextResponse.json({ error: "Message too short" }, { status: 400 });

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <contact@rosyadzain.com>",
      to:   "zainvon@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New message from ${name} (${email})\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
