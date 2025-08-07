import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
      © 2025 Nico Barberis · Proyecto educativo ·{" "}
      <a
        href="https://github.com/tuusuario/morse-translator"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-600 dark:hover:text-blue-400"
      >
        GitHub
      </a>{" "}
      |{" "}
      <a
        href="https://tupagina.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-600 dark:hover:text-blue-400"
      >
        Portfolio
      </a>
    </footer>
  );
};

export default Footer;
