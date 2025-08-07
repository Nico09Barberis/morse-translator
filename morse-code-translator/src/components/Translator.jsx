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

const Translator = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Morse Code Translator
      </h1>
      <textarea
        className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu texto aquí..."
      />
      <button
        onClick={translateToMorse}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Traducir
      </button>
      <div className="mt-4 p-2 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-white break-words">
        {morse}
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
    </div>
  );
};

export default Translator;
