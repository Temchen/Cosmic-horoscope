"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [zodiac, setZodiac] = useState("");

  // Простая функция определения знака зодиака
  const getZodiac = (date: string) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Овен";
    // ... (добавьте остальные знаки для полного функционала)
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Скорпион";
    return "Знак не определен";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setZodiac(getZodiac(birthDate));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Анимированные звезды (можно добавить через CSS или Canvas) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?q=80&w=2072&auto=format&fit=crop')] opacity-20 bg-cover"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full"
      >
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Cosmic Oracle
        </h1>
        <p className="text-gray-300 mb-6">Откройте тайны своей натальной карты</p>

        {!zodiac ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-black/30 p-3 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500 text-center"
              required
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Узнать свою судьбу
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl"
          >
            Ваш знак: <span className="font-bold text-pink-400">{zodiac}</span>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}