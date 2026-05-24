import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const FROM = "Portfolio Contact <contact@rosyadzain.com>";
const TO   = "rosyadz123@gmail.com";

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
    const { error: resendError } = await resend.emails.send({
      from:    FROM,
      to:      TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `From: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message.trim(),
        ``,
        `---`,
        `Reply directly to this email to respond to ${name}.`,
      ].join("\n"),
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json({ error: resendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
