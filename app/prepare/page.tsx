"use client";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function PreparePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <Header />
      <div className="max-w-2xl text-center bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md z-10 mt-10">
        <img src="https://images.unsplash.com/photo-1518182170546-0766bb6bf562?q=80&w=800&auto=format&fit=crop" alt="Магия" className="rounded-2xl mb-8 mx-auto w-full h-64 object-cover" />
        <h1 className="text-3xl font-bold mb-4 text-pink-400">Внимание: Приготовьтесь к погружению</h1>
        <p className="text-gray-300 mb-8">
          Не спешите с ответами. Интуиция и искренность — ключи к точному астральному плану. 
          Внимательно читайте каждый вопрос и выбирайте то, что резонирует с вами больше всего.
          Ваш результат будет рассчитан индивидуально.
        </p>
        <button 
          onClick={() => router.push("/quiz")}
          className="bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-8 rounded-full font-semibold"
        >
          Я готов(а) начать
        </button>
      </div>
    </div>
  );
}