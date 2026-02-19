import { useState } from "react";
import { sendInquiry } from "../api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", text: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    try {
      await sendInquiry(form);
      setStatus({ type: "ok", text: "Mulțumim! Am primit cererea ta și revenim cât mai curând." });
      setForm({ name: "", email: "", phone: "", eventDate: "", message: "" });
    } catch (e2) {
      setStatus({ type: "bad", text: e2.message });
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Contact</h2>
        <p className="p">Trimite-ne detaliile evenimentului și îți răspundem rapid.</p>

        <div className="contactGrid">
          <form className="form" onSubmit={onSubmit}>
            <div className="row">
              <div className="field">
                <label>Nume *</label>
                <input name="name" value={form.name} onChange={onChange} required />
              </div>
              <div className="field">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={onChange} required />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Telefon</label>
                <input name="phone" value={form.phone} onChange={onChange} />
              </div>
              <div className="field">
                <label>Data eveniment</label>
                <input name="eventDate" type="date" value={form.eventDate} onChange={onChange} />
              </div>
            </div>

            <div className="field">
              <label>Mesaj *</label>
              <textarea name="message" rows="5" value={form.message} onChange={onChange} required />
            </div>

            <button className="btnGold" type="submit">Trimite</button>

            {status.text && (
              <p className={`p ${status.type === "ok" ? "success" : "error"}`}>{status.text}</p>
            )}
          </form>

          <div className="sideCard">
            <div className="cardTitle">Glowing Luxe Candles</div>
            <p className="p">Disponibilitate, pachete și personalizări.</p>
            <div className="mini">
              <div><strong>Email:</strong> hello@glowingluxecandles.ro</div>
              <div><strong>Telefon:</strong> +40 xxx xxx xxx</div>
              <div><strong>Oraș:</strong> (completează)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
