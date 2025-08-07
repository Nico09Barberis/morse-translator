import Translator from "../components/Translator";
import useDarkMode from "../hook/useDarkMode";
import { Moon, Sun } from "lucide-react";

const TranslatorPage = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:scale-110 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Translator />
    </div>
  );
};

export default TranslatorPage;
