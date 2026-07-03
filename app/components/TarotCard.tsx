"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const predictions = [
  "Сегодня ваш час. Действуйте смело!",
  "Внимание к деталям спасет ситуацию.",
  "Неожиданное сообщение перевернет день.",
];

export default function TarotCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prediction, setPrediction] = useState("");

  const handleFlip = () => {
    if (isFlipped) return;
    setPrediction(predictions[Math.floor(Math.random() * predictions.length)]);
    setIsFlipped(true);
  };

  return (
    <div className="perspective-1000 w-64 h-96 cursor-pointer" onClick={handleFlip}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Рубашка карты */}
        <div 
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-purple-500 flex items-center justify-center shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-6xl">✨</span>
        </div>
        
        {/* Лицо карты */}
        <div 
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-pink-900 to-purple-800 border-2 border-pink-400 flex items-center justify-center p-4 text-center shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-lg font-medium">{prediction}</p>
        </div>
      </motion.div>
    </div>
  );
}