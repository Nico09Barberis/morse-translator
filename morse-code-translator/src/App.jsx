import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TranslatorPage from './pages/TranslatorPage';
import PracticePage from './pages/PracticePage';
import DictionaryPage from './pages/DictionaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translator" element={<TranslatorPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/dictionary" element={<DictionaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
