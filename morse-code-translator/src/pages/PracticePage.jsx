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
        darkMode
          ? "bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-800 text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-white text-black"
      } min-h-screen flex items-center justify-center pt-12 px-4`}
    >
      <section
        className={`max-w-md w-full text-center p-6 rounded-xl shadow-xl
        transition-colors duration-300
        ${darkMode ? "bg-gray-800/80" : "bg-white/90"}
      `}
      >
        {/* Botón modo oscuro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-2.5 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:scale-110 transition-transform"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <h2 className="text-3xl font-extrabold mb-6 tracking-tight">
          Modo Práctica - Morse
        </h2>

        {/* Botones de modo */}
        <div className="mb-6 flex justify-center gap-5">
          {["textToMorse", "morseToText"].map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-5 py-2 rounded-full font-semibold transition
              ${
                mode === m
                  ? "bg-[#4A6FA5] text-white shadow-md scale-105"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }
            `}
            >
              {m === "textToMorse" ? "Texto → Morse" : "Morse → Texto"}
            </button>
          ))}
        </div>

        {/* Pregunta */}
        <div className="mb-3 text-lg font-semibold leading-relaxed">
          {mode === "textToMorse"
            ? "¿Cuál es el código Morse para la letra:"
            : "¿Qué letra o número representa este código Morse?"}
        </div>

        {/* Letra / Código actual */}
        <div className="text-6xl font-mono font-bold mb-8 select-none">
          {mode === "textToMorse" ? current : <code>{current}</code>}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-3 text-center w-full text-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          dark:bg-gray-800 dark:text-white transition"
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
            className="mt-5 w-full font-bold tracking-wider bg-[#4A6FA5] text-white py-3 rounded-lg hover:bg-[#36527c] shadow transition"
          >
            Verificar
          </button>
        </form>

        {/* Botón siguiente */}
        <button
          onClick={nextQuestion}
          className="mt-4 w-full font-bold tracking-wider bg-gray-400 text-black py-3 rounded-lg hover:bg-gray-500 shadow transition"
        >
          Siguiente
        </button>

        {/* Feedback */}
        {feedback && (
          <p className="mt-6 text-xl font-bold min-h-[2rem]">{feedback}</p>
        )}

        {/* Score */}
        <div className="mt-8 text-left text-lg font-medium tracking-wide select-none">
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
