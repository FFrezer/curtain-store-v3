import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message, company } = body;

  if (company) return NextResponse.json({ error: 'Spam detected' }, { status: 400 });

  const lowerMessage = `${name} ${message}`.toLowerCase();
  const bannedWords = ['casino', 'bitcoin', 'loan', 'forex'];
  if (bannedWords.some(word => lowerMessage.includes(word))) {
    return NextResponse.json({ error: 'Message flagged as spam' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'ADE Curtain Contact <no-reply@adecurtain.com>',
      to: 'info@adecurtain.com',
      subject: `New message from ${name}`,
      replyTo: email,
      text: `New inquiry:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send failed', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
