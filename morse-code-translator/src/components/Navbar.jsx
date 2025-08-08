import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

 const linkClasses = (path) =>
  `relative px-1 py-2 font-medium transition-all duration-300 
   ${location.pathname === path
      ? "text-blue-700 dark:text-blue-300"
      : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-300"
   }
   after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current 
   after:left-0 after:bottom-0 after:transition-all after:duration-300
   hover:after:w-full`;

  return (
    <nav className="w-full bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center relative">
        {/* Hamburguesa - izquierda en mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 dark:text-white hover:scale-110 transition-transform focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Título */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Morse Express
            </Link>
          </h1>
        </div>

        {/* Links en desktop */}
        <div className="hidden md:flex gap-4 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/translator" className={linkClasses("/translator")}>
            Traductor
          </Link>
          <Link to="/practice" className={linkClasses("/practice")}>
            Práctica
          </Link>
          <Link to="/dictionary" className={linkClasses("/dictionary")}>
            Diccionario
          </Link>
        </div>
      </div>

      {/* Links en mobile */}
      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-2 animate-slide-down"
        >
          <Link to="/translator" className={linkClasses("/translator")} onClick={toggleMenu}>
            Traductor
          </Link>
          <Link to="/practice" className={linkClasses("/practice")} onClick={toggleMenu}>
            Práctica
          </Link>
          <Link to="/dictionary" className={linkClasses("/dictionary")} onClick={toggleMenu}>
            Diccionario
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
