// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleStart = () => {
    if (user) {
      router.push("/prepare"); // Если вошел, идем на предупреждение
    } else {
      alert("Пожалуйста, зарегистрируйтесь или войдите, чтобы получить астральный план.");
      // Здесь можно программно открыть модалку, но для простоты используем alert
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <Header />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?q=80&w=2072&auto=format&fit=crop')] opacity-20 bg-cover"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        className="z-10 text-center p-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-500">
          Откройте тайны своей натальной карты
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
          Узнайте, как расположение звезд в момент вашего рождения влияет на ваш путь, отношения и успех.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl py-4 px-10 rounded-full font-semibold shadow-2xl shadow-purple-900/50"
        >
          Получить астральный план ✨
        </motion.button>
      </motion.div>
    </div>
  );
}