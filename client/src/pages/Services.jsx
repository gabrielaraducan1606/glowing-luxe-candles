import { useEffect, useState } from "react";
import { fetchServices } from "../api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Servicii</h2>
        <p className="p">Prezentare generală. Pentru detalii, intră în meniul Nuntă/Botez.</p>

        {loading && <p className="p">Se încarcă...</p>}
        {err && <p className="p error">{err}</p>}

        <div className="cards">
          {services.map((s) => (
            <div className="card" key={s.id}>
              <div className="cardTitle">{s.title}</div>
              <div className="cardText">{s.short}</div>
              <ul className="bullets">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
