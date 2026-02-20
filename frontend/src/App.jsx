import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicii" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:group/:slug" element={<CategoryPage />} />
        </Routes>
      </main>
    </>
  );
}
