import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-black bg-[#090f1b] py-4 text-center text-sm text-[#F9FAFB]">
      © {new Date().getFullYear()} Barberis Nicolas. Todos los derechos reservados. 
      <a
        href="https://github.com/Nico09Barberis/morse-translator.git"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline ml-4 hover:text-[#649cd3]"
      >
        GitHub
      </a>{" "}
      |{" "}
      <a
        href="https://web-portafolio-phi.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline hover:text-[#649cd3]"
      >
        Visita mi portafolio
      </a>
    </footer>
  );
};

export default Footer;
