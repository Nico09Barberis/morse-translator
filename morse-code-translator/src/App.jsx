import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TranslatorPage from "./pages/TranslatorPage";
import PracticePage from "./pages/PracticePage";
import DictionaryPage from "./pages/DictionaryPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translator" element={<TranslatorPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
