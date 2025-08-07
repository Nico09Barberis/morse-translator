import { useState, useEffect } from "react";

const morseDict = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
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
  " ": "/",
};

const morseToText = Object.entries(morseDict).reduce((acc, [key, value]) => {
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
      .map((char) => morseDict[char] || "")
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
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Morse Code Translator
      </h1>

      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => setMode("textToMorse")}
          className={`px-4 py-2 rounded ${
            mode === "textToMorse"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
          }`}
        >
          Texto → Morse
        </button>
        <button
          onClick={() => setMode("morseToText")}
          className={`px-4 py-2 rounded ${
            mode === "morseToText"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
          }`}
        >
          Morse → Texto
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          mode === "textToMorse"
            ? "Escribe tu texto aquí..."
            : "Escribe código Morse aquí (usa espacios para separar letras)"
        }
      />

      <button
        onClick={() =>
          mode === "textToMorse" ? translateToMorse() : translateToText()
        }
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        {mode === "textToMorse" ? "Traducir a Morse" : "Traducir a Texto"}
      </button>

      <div className="mt-4 p-2 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-white break-words flex flex-wrap gap-1 justify-start">
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

      <button
        onClick={handleCopy}
        disabled={!morse}
        className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition disabled:opacity-50"
      >
        Copiar al portapapeles
      </button>

      {copied && (
        <p className="text-green-600 text-sm mt-1 text-center">¡Copiado!</p>
      )}

      <button
        onClick={playMorseAudio}
        disabled={!morse || isPlaying}
        className="w-full mt-2 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition disabled:opacity-50"
      >
        {isPlaying ? "Reproduciendo..." : "🔊 Reproducir Morse"}
      </button>
    </div>
  );
};

export default Translator;

const playBeep = (duration = 100, frequency = 600) => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    context.close();
  }, duration);
};
