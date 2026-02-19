import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // încarcă backend/.env local (pe Render nu încurcă cu nimic)

const app = express();

/**
 * CORS: citește din env:
 * ALLOWED_ORIGINS=http://localhost:5173,https://glowing.artfest.ro
 * Dacă nu e setat, permite toate origin-urile (ca înainte).
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // permite request-uri fără Origin (ex: curl, server-to-server)
      if (!origin) return cb(null, true);

      // dacă nu ai setat ALLOWED_ORIGINS, păstrează comportamentul tău inițial (open)
      if (allowedOrigins.length === 0) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

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

app.get("/", (req, res) => res.type("text").send("Glowing API running. Try /api/health"));

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
  console.log("New inquiry:", req.body);
  return res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
