import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = new Set([
  "https://glowing.artfest.ro",
  "https://glowing-luxe-candles.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

app.use(
  cors({
    origin(origin, cb) {
      // allow requests with no origin (curl/postman)
      if (!origin) return cb(null, true);

      if (allowedOrigins.has(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked for origin: ${origin}`), false);
    }
  })
);

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

app.get("/", (req, res) => res.type("text").send("API running. Try /api/health"));
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/services", (req, res) => res.json(services));

app.post("/api/inquiries", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "Name, email și message sunt obligatorii."
    });
  }
  console.log("New inquiry:", { name, email, message });
  return res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
