import React from "react";
import { morseDictionary } from "../utils/morseDictionary";
import useDarkMode from "../hook/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const DictionaryPage = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        darkMode
          ? "bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-800 text-white"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
    >
      {/* Toggle dark mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-2.5 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <section className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
          Diccionario Morse
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Object.entries(morseDictionary).map(([char, morse], index) => (
            <motion.div
              key={char}
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-6 text-center 
              bg-white dark:bg-gray-800 shadow-md dark:shadow-lg
              cursor-pointer
              transition-shadow transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.35,
                ease: "easeOut",
              }}
              whileHover={{
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                backgroundColor: darkMode ? "#1E40AF" : "#BFDBFE", // azul oscuro para dark, azul claro para light
              }}
              style={{ backgroundColor: darkMode ? "#1F2937" : "#FFFFFF" }} // bg inicial acorde a modo
            >
              <div className="text-2xl font-bold mb-3 select-none">{char}</div>
              <div className="font-mono text-lg select-text">{morse}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DictionaryPage;
