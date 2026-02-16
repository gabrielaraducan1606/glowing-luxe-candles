import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const services = [
  {
    id: "wedding",
    title: "Evenimente – Nuntă",
    short: "Invitații, mărturii, aranjamente și decor premium pentru nuntă.",
    bullets: ["Consultanță", "Personalizare", "Livrare/aranjare"]
  },
  {
    id: "baptism",
    title: "Evenimente – Botez",
    short: "Invitații, trusou, aranjamente și seturi pentru botez.",
    bullets: ["Personalizare", "Pachete complete", "Detalii elegante"]
  },
  {
    id: "corporate",
    title: "Evenimente Corporate",
    short: "Cadouri și decor premium pentru branduri și evenimente corporate.",
    bullets: ["Logo", "Pachete", "Setup la locație"]
  }
];

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/services", (req, res) => res.json(services));

app.post("/api/inquiries", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email și message sunt obligatorii." });
  }
  console.log("New inquiry:", req.body);
  return res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
