// app/components/Header.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "register") {
      await supabase.auth.signUp({ email, password });
    } else {
      await supabase.auth.signInWithPassword({ email, password });
    }
    setModalType(null);
  };

  return (
    <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
      {/* Логотип слева сверху */}
      <div className="flex items-center gap-2">
        <Image src="/AstroVibe.png" alt="AstroVibe" width={40} height={40} />
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AstroVibe
        </span>
      </div>

      {/* Меню гамбургер справа сверху */}
      <div className="relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="z-50 flex flex-col gap-1.5 p-2">
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-4 w-48 bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20"
            >
              <button onClick={() => { setModalType("login"); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg">Войти</button>
              <button onClick={() => { setModalType("register"); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg">Регистрация</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Модальное окно авторизации */}
      <AnimatePresence>
        {modalType && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setModalType(null)}
          >
            <motion.form 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onSubmit={handleAuth} 
              className="bg-[#1a1830] p-8 rounded-2xl w-96 border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl mb-4 text-center">{modalType === "login" ? "Вход" : "Регистрация"}</h2>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 bg-black/30 rounded-lg border border-white/10" required />
              <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-6 bg-black/30 rounded-lg border border-white/10" required />
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold">
                {modalType === "login" ? "Войти" : "Создать аккаунт"}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}