import { Link } from "react-router-dom";

const Home = () => (
  <section className="hero h-screen flex flex-col justify-center items-center bg-blue-600 text-white px-4 text-center">
    <h1 className="text-5xl font-bold mb-4">Morse Code Translator</h1>
    <p className="mb-8 max-w-xl text-lg">
      Traduce texto a código Morse y escucha los sonidos con facilidad.
    </p>
    <Link
      to="/translator"
      className="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition"
    >
      Comenzar
    </Link>
  </section>
);

export default Home;
