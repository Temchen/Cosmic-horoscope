// app/quiz/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";

const steps = [
  // --- Блок 1: Вводные данные ---
  { 
    type: "question", 
    text: "В какое время года вы появились на свет?", 
    options: ["Весна (Овен, Телец, Близнецы)", "Лето (Рак, Лев, Дева)", "Осень (Весы, Скорпион, Стрелец)", "Зима (Козерог, Водолей, Рыбы)"] 
  },
  { 
    type: "question", 
    text: "Если вспомнить время суток вашего рождения, то это было...", 
    options: ["Утро (рассвет, начало дня)", "День (яркое солнце, полдень)", "Вечер (закат, сумерки)", "Ночь (глубокая тьма, полночь)"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: Время вашего рождения определяет ваш Асцендент — социальную маску и то, как вас видят окружающие при первой встрече.", 
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Блок 2: Внутренняя энергия и Стихия ---
  { 
    type: "question", 
    text: "Как бы вы описали свою внутреннюю энергию?", 
    options: ["Активная, пробивная, я не сижу на месте", "Спокойная, принимающая, я как скала", "Переменчивая, творческая, я генератор идей", "Глубокая, чувствительная, я эмпат"] 
  },
  { 
    type: "question", 
    text: "К какой стихии вы чувствуете наибольшую тягу?", 
    options: ["Огонь (страсть, тепло, действие)", "Земля (стабильность, природа, комфорт)", "Воздух (свобода, общение, интеллект)", "Вода (эмоции, интуиция, тайны)"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: Недостающая стихия в вашей натальной карте часто проявляется в вашем партнере. Мы бессознательно ищем то, чего нам не хватает самих.", 
    img: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Блок 3: Жизненная позиция и решения ---
  { 
    type: "question", 
    text: "В сложных жизненных ситуациях вы опираетесь на...", 
    options: ["Холодный расчет и логику", "Интуицию и предчувствия", "Опыт и мудрость прошлого", "Советы близких людей"] 
  },
  { 
    type: "question", 
    text: "Как вы справляетесь с сильным стрессом?", 
    options: ["Беру паузу и ухожу в себя", "Иду в конфликт, выплескиваю эмоции", "Отвлекаюсь на работу или хобби", "Ищу поддержку у друзей"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: Положение Марса в вашей карте показывает не только то, как вы злитесь, но и то, как вы восстанавливаете энергию после кризиса.", 
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Блок 4: Любовь и Отношения ---
  { 
    type: "question", 
    text: "Что для вас является фундаментом идеальных отношений?", 
    options: ["Взаимное доверие и честность", "Независимость партнеров", "Страстное притяжение", "Общие цели и уютный быт"] 
  },
  { 
    type: "question", 
    text: "Как вы чаще всего выражаете свои чувства?", 
    options: ["Открыто и ярко, я говорю прямо", "Сдержанно, через заботу и поступки", "Через подарки и приятные мелочи", "Мне сложно открываться, я долго присматриваюсь"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: Венера в Водолее делает людей свободолюбивыми в любви. Им важна интеллектуальная связь больше, чем романтические клише.", 
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Блок 5: Карьера и Финансы ---
  { 
    type: "question", 
    text: "Что для вас важнее всего в работе?", 
    options: ["Высокий доход и статус", "Творческая свобода и самовыражение", "Стабильность и уверенность в завтрашнем дне", "Польза для общества и помощь людям"] 
  },
  { 
    type: "question", 
    text: "Какое утверждение про деньги вам ближе?", 
    options: ["Деньги любят счет, я привык(ла) копить", "Деньги — это энергия, они приходят и уходят", "Трачу на эмоции и впечатления", "Инвестирую в свое развитие и будущее"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: 2-й дом в астрологии отвечает за финансы. Если там находится Юпитер, человек часто притягивает деньги, но должен уметь ими делиться.", 
    img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Блок 6: Кармические задачи и Духовность ---
  { 
    type: "question", 
    text: "Чего вы опасаетесь больше всего в жизни?", 
    options: ["Потери свободы и независимости", "Одиночества и ненужности", "Финансового краха", "Не реализовать свой потенциал"] 
  },
  { 
    type: "question", 
    text: "Как вы относитесь к эзотерике и карме?", 
    options: ["Верю, это часть моей жизни", "Иногда задумываюсь, но не углубляюсь", "Скорее скептик, но загадка интересна", "Нет, верю только в науку и факты"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: Северный Узел (Раху) в натальной карте показывает вашу кармическую задачу — то, к чему ваша душа стремится в этом воплощении, даже если это страшно.", 
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Блок 7: Итоги и желания ---
  { 
    type: "question", 
    text: "Где вы чувствуете себя максимально в своей тарелке?", 
    options: ["В шумном мегаполисе, среди событий", "На лоне природы, в тишине", "В кругу семьи или близких друзей", "В дороге, путешествуя по миру"] 
  },
  { 
    type: "question", 
    text: "К чему вы в глубине души стремитесь прямо сейчас?", 
    options: ["Найти свою любовь или укрепить отношения", "Сделать рывок в карьере и деньгах", "Понять себя и найти внутренний покой", "Получить новые яркие эмоции"] 
  },
  { 
    type: "fact", 
    text: "Интересный факт: Сатурн возвращается на свое место в карте каждые 29,5 лет. Это время кармической переоценки, когда мы становимся истинными взрослыми.", 
    img: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?q=80&w=800&auto=format&fit=crop" 
  },

  // --- Финальный вопрос ---
  { 
    type: "question", 
    text: "Какого результата вы ждете от этой астрологической расшифровки?", 
    options: ["Получить конкретные советы на каждый день", "Найти ответы на старые вопросы", "Понять свое предназначение", "Просто интересно посмотреть, что скажут звезды"] 
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const isFact = steps[currentStep]?.type === "fact";

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/result");
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 pt-24 pb-12">
      <Header />
      <div className="w-full max-w-2xl z-10 mt-10">
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-8">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.5 }} 
          />
        </div>

        <div className="text-center text-gray-400 text-sm mb-4">
          Шаг {currentStep + 1} из {steps.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md text-center"
          >
            {isFact ? (
              <>
                <img 
                  src={steps[currentStep].img} 
                  alt="Astro Fact" 
                  className="rounded-xl mb-6 w-full h-48 object-cover shadow-lg shadow-purple-900/30" 
                />
                <h3 className="text-xl text-purple-300 mb-4 font-semibold">✨ Астрологический факт</h3>
                <p className="mb-8 text-gray-200 leading-relaxed">{steps[currentStep].text}</p>
                <button 
                  onClick={handleNext} 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-8 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Продолжить
                </button>aa
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl mb-8 font-light">{steps[currentStep].text}</h2>
                <div className="flex flex-col gap-4">
                  {steps[currentStep].options?.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={handleNext} 
                      className="bg-white/10 hover:bg-white/20 transition-all py-4 px-6 rounded-xl border border-white/10 text-left hover:border-pink-500/50"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}