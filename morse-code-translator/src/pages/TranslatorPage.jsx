import Translator from "../components/Translator";
import useDarkMode from "../hook/useDarkMode";
import { Moon, Sun } from "lucide-react";

const TranslatorPage = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100
      dark:from-neutral-900 dark:via-slate-900 dark:to-neutral-800
      transition-colors duration-500"
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-2.5 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:scale-110 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Translator />
    </div>
  );
};

export default TranslatorPage;
