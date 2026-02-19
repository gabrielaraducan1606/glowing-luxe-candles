import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicii" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:group/:slug" element={<CategoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
