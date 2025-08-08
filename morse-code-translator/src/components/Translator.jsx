import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { morseDictionary } from "../utils/morseDictionary.js";


const morseToText = Object.entries(morseDictionary).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const Translator = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("textToMorse"); // o "morseToText"
  const [activeIndex, setActiveIndex] = useState(null);

  const translateToMorse = () => {
    const translated = text
      .toLowerCase()
      .split("")
      .map((char) => morseDictionary[char] || "")
      .join(" ");
    setMorse(translated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(morse);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const translateToText = () => {
    const translated = text
      .trim()
      .split(" ")
      .map((symbol) => morseToText[symbol] || "")
      .join("");
    setMorse(translated);
  };

  //===============================================================
  //                            AUDIO
  //===============================================================

  const [isPlaying, setIsPlaying] = useState(false);

  const playMorseAudio = async () => {
    if (!morse || isPlaying) return;

    setIsPlaying(true);

    const symbols = morse.split("");

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      setActiveIndex(i);

      if (symbol === ".") {
        playBeep(100);
        await new Promise((r) => setTimeout(r, 200));
      } else if (symbol === "-") {
        playBeep(300);
        await new Promise((r) => setTimeout(r, 400));
      } else if (symbol === " ") {
        await new Promise((r) => setTimeout(r, 200));
      } else if (symbol === "/") {
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    setActiveIndex(null);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
        Traductor Codigo Morse
      </h1>

      {/* Selector de modo */}
      <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={() => setMode("textToMorse")}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            mode === "textToMorse"
              ? "bg-blue-600 text-white shadow-md scale-105"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Texto → Morse
        </button>
        <button
          onClick={() => setMode("morseToText")}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            mode === "morseToText"
              ? "bg-blue-600 text-white shadow-md scale-105"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Morse → Texto
        </button>
      </div>

      {/* Área de texto */}
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          mode === "textToMorse"
            ? "Escribe tu texto aquí..."
            : "Escribe código Morse aquí (usa espacios para separar letras)"
        }
      />

      {/* Botón de traducción */}
      <button
        onClick={() =>
          mode === "textToMorse" ? translateToMorse() : translateToText()
        }
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 shadow transition"
      >
        {mode === "textToMorse" ? "Traducir a Morse" : "Traducir a Texto"}
      </button>

      {/* Resultado */}
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-white break-words flex flex-wrap gap-1 justify-start border border-gray-300/50 dark:border-gray-600/50">
        {morse.split("").map((char, i) => (
          <span
            key={i}
            className={`transition-all px-1 rounded ${
              i === activeIndex
                ? "bg-yellow-400 text-black scale-125 font-bold"
                : ""
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Botón de copiar */}
      <button
        onClick={handleCopy}
        disabled={!morse}
        className="w-full mt-3 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 shadow transition disabled:opacity-50"
      >
        Copiar al portapapeles
      </button>
      {copied && (
        <p className="text-green-600 text-sm mt-1 text-center">¡Copiado!</p>
      )}

      {/* Botón de reproducir */}
      <button
        onClick={playMorseAudio}
        disabled={!morse || isPlaying}
        className="w-full mt-2 bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 shadow transition disabled:opacity-50"
      >
      {isPlaying ? (
        <span className="flex items-center justify-center gap-2">
          Reproduciendo...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Volume2 size={18} />
          Reproducir Morse
        </span>
      )}
      </button>
    </div>
  );
};

export default Translator;

let audioCtx = null;

const playBeep = (duration = 100, frequency = 600, volume = 0.2) => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000);

  return new Promise((resolve) => {
    setTimeout(() => resolve(), duration);
  });
};
