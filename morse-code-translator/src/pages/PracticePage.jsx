import { useState } from "react";
import useDarkMode from "../hook/useDarkMode";
import { Moon, Sun } from "lucide-react";

const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
};

const letters = Object.keys(morseCodeMap);
const morseToLetterMap = Object.entries(morseCodeMap).reduce(
  (acc, [letter, morse]) => {
    acc[morse] = letter;
    return acc;
  },
  {}
);

const normalizeMorse = (str) => str.trim().replace(/\s+/g, " "); // espacios múltiples a uno solo, trim

function getRandomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function getRandomMorse() {
  const randomLetter = getRandomLetter();
  return morseCodeMap[randomLetter];
}

const PracticePage = () => {
  const [mode, setMode] = useState("textToMorse"); // modo actual
  const [current, setCurrent] = useState(
    mode === "textToMorse" ? getRandomLetter() : getRandomMorse()
  );
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [darkMode, setDarkMode] = useDarkMode();

  // Cambia la pregunta actual dependiendo del modo
  const nextQuestion = () => {
    const nextItem =
      mode === "textToMorse" ? getRandomLetter() : getRandomMorse();
    setCurrent(nextItem);
    setInput("");
    setFeedback("");
  };

  const checkAnswer = () => {
    if (mode === "textToMorse") {
      if (normalizeMorse(input) === morseCodeMap[current]) {
        setFeedback("✅ ¡Correcto!");
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setFeedback(`❌ Incorrecto. Era: ${morseCodeMap[current]}`);
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      }
    } else {
      if (input.trim().toUpperCase() === morseToLetterMap[current]) {
        setFeedback("✅ ¡Correcto!");
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setFeedback(`❌ Incorrecto. Era: ${morseToLetterMap[current]}`);
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  // Cambiar modo y reiniciar la práctica
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setCurrent(
      newMode === "textToMorse" ? getRandomLetter() : getRandomMorse()
    );
    setInput("");
    setFeedback("");
    setScore({ correct: 0, wrong: 0 });
  };

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      >
      <section
        className={`min-h-screen p-4 max-w-md mx-auto text-center transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:scale-110 transition"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <h2 className="text-2xl font-bold mb-4">Modo Práctica - Morse</h2>

        <div className="mb-4 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded ${
              mode === "textToMorse"
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
            onClick={() => handleModeChange("textToMorse")}
          >
            Texto → Morse
          </button>
          <button
            className={`px-4 py-2 rounded ${
              mode === "morseToText"
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
            onClick={() => handleModeChange("morseToText")}
          >
            Morse → Texto
          </button>
        </div>

        <div className="mb-2 text-lg font-semibold">
          {mode === "textToMorse"
            ? "¿Cuál es el código Morse para la letra:"
            : "¿Qué letra o número representa este código Morse?"}
        </div>

        <div className="text-5xl font-mono mb-6">
          {mode === "textToMorse" ? current : <code>{current}</code>}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 rounded px-4 py-2 text-center w-full"
            type="text"
            placeholder={
              mode === "textToMorse"
                ? "Escribe el código Morse (puntos y rayas)"
                : "Escribe la letra o número correspondiente"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Verificar
          </button>
        </form>

        <button
          onClick={nextQuestion}
          className="mt-2 w-full bg-gray-400 text-black py-2 rounded hover:bg-gray-500 transition"
        >
          Siguiente
        </button>

        {feedback && <p className="mt-4 text-xl">{feedback}</p>}

        <div className="mt-6 text-left text-lg">
          <p>
            <strong>Aciertos:</strong> {score.correct} |{" "}
            <strong>Errores:</strong> {score.wrong}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PracticePage;
