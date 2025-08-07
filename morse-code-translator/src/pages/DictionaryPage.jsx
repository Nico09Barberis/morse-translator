// src/pages/DictionaryPage.jsx
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
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Toggle dark mode - ahora en esquina real */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:scale-110 transition-transform duration-300"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <section className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Diccionario Morse
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(morseDictionary).map(([char, morse], index) => (
            <motion.div
              key={char}
              className="border border-gray-300 dark:border-gray-700 rounded p-4 text-center bg-white dark:bg-gray-800 shadow transition-colors duration-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <div className="text-xl font-bold mb-2">{char}</div>
              <div className="font-mono text-lg">{morse}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DictionaryPage;
