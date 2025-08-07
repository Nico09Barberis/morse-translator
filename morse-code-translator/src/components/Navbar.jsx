// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-3 py-2 rounded transition-colors ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900"
    }`;

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Morse Code App
        </h1>
        <div className="flex gap-4">
          <Link to="/" className={linkClasses("/")}>
            Inicio
          </Link>
          <Link to="/practice" className={linkClasses("/practice")}>
            Práctica
          </Link>
          <Link to="/dictionary" className={linkClasses("/dictionary")}>
            Diccionario
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
