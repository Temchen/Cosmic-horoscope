import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "missing-key", 
    baseURL: "https://api.groq.com/openai/v1" 
  });

  const { sign } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Ты — мистический, но современный астролог. Пиши коротко (3-4 предложения), вдохновляюще, без клише." },
        { role: "user", content: `Напиши гороскоп на сегодня для знака ${sign}.` }
      ],
      model: "llama3-8b-8192",
    });

    return NextResponse.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error("Ошибка API:", error);
    return NextResponse.json({ text: "Звезды сегодня молчат. Попробуйте позже." }, { status: 500 });
  }
}