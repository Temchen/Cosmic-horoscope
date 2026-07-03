import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { sign } = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Ты — мистический, но современный астролог. Пиши коротко (3-4 предложения), вдохновляюще, без клише вроде 'звезды благоволят'." },
      { role: "user", content: `Напиши гороскоп на сегодня для знака ${sign}.` }
    ],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({ text: completion.choices[0].message.content });
}