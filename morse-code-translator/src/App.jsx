import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TranslatorPage from './pages/TranslatorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translator" element={<TranslatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
