"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import { Sparkles, Heart, TrendingUp, Shield } from "lucide-react";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0c29]">
        <motion.div 
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-t-4 border-purple-500 border-solid rounded-full mb-8"
        ></motion.div>
        <h2 className="text-2xl text-purple-300">Звезды выстраиваются в линию...</h2>
        <p className="text-gray-400 mt-2">Анализируем ваши ответы и натальную карту</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 pt-24">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md text-center z-10 mb-10"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-500">
          Ваш Астральный План
        </h1>
        <p className="text-gray-300 text-lg">
          Вы — человек, обладающий глубокой интуицией. Ваша натальная карта указывает на то, что вы находитесь на пороге важных перемен. 
          Ваши сильные стороны — способность адаптироваться и видеть возможности там, где другие видят преграды.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="max-w-3xl w-full bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md z-10"
      >
        <h2 className="text-2xl text-center mb-8 text-pink-400">Спасибо, что доверились AstroVibe! 🙏</h2>
        <p className="text-gray-400 mb-6 text-center">Эта расшифровка поможет вам в жизни следующим образом:</p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
            <Sparkles className="text-yellow-400 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Ясность целей</h3>
              <p className="text-gray-400">Вы поймете свое истинное предназначение и перестанете тратить энергию на чужие мечты.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
            <Heart className="text-red-400 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Гармония в отношениях</h3>
              <p className="text-gray-400">Знание своей Венеры поможет находить правильных людей и избегать токсичных связей.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
            <TrendingUp className="text-green-400 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Финансовый рост</h3>
              <p className="text-gray-400">Астральный план укажет сферы, где ваши финансы будут расти быстрее всего.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
            <Shield className="text-blue-400 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Защита от ошибок</h3>
              <p className="text-gray-400">Вы научитесь предчувствовать неприятности и обходить стороной конфликтные ситуации.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}