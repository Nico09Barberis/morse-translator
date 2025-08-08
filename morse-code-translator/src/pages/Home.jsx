import { Link } from "react-router-dom";

const Home = () => (
  <section className="hero h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-500 text-white px-6 text-center transition-all duration-500 ease-in-out">
    <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg animate-fade-in">
      Morse Express
    </h1>
    <p className="mb-10 max-w-2xl text-xl md:text-2xl text-white/90 animate-fade-in delay-200">
      Traduce texto a código Morse y escucha los sonidos con facilidad.
    </p>
    <Link
      to="/translator"
      className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
    >
      Comenzar
    </Link>
  </section>
);

export default Home;
