import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Glowing Luxe Candles</div>
            <h1 className={styles.h1}>
              Eleganță, lumină și detalii premium pentru evenimente.
            </h1>
            <p className={styles.p}>
              Nuntă, botez sau evenimente private — creăm invitații, mărturii,
              aranjamente și decor în stil luxury.
            </p>

            <div className={styles.ctaRow}>
              <Link className={`btnGold ${styles.btn}`} to="/contact">
                Cere ofertă
              </Link>
              <Link className={`btnGhost ${styles.btn}`} to="/servicii">
                Vezi servicii
              </Link>
            </div>

            <div className={styles.badges}>
              <span className={styles.badge}>Black & Gold</span>
              <span className={styles.badge}>Personalizat</span>
              <span className={styles.badge}>Luxury</span>
            </div>

            {/* ✅ SOCIAL MEDIA */}
<div className={styles.socialBlock}>
  <p className={styles.socialText}>
    Ne găsești și pe rețelele sociale ✨
  </p>

  <div className={styles.socialRow}>
    <a
      href="https://www.facebook.com/share/1BUnn7Ffym/"
      target="_blank"
      rel="noreferrer"
      className={styles.socialIcon}
      aria-label="Facebook"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://www.tiktok.com/@glowingluxecandles?_r=1&_t=ZN-93YO4Bjfkc2"
      target="_blank"
      rel="noreferrer"
      className={styles.socialIcon}
      aria-label="TikTok"
    >
      <FaTiktok />
    </a>

    <a
      href="https://www.instagram.com/glowing.luxe.candles?utm_source=qr&igsh=eWw4enFuOGhud3lr"
      target="_blank"
      rel="noreferrer"
      className={styles.socialIcon}
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>
  </div>
</div>

          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroCardTitle}>Ce oferim</div>
            <ul className={styles.list}>
              <li>Tort copii pentru grădiniță/creșă</li>
              <li>Baloane heliu</li>
              <li>Cod QR</li>
              <li>Invitații & invitații digitale</li>
              <li>Mărturii</li>
              <li>Aranjamente florale</li>
              <li>Aranjamente baloane</li>
              <li>Panouri invitați</li>
              <li>Tăvițe moț</li>
              <li>Trusouri</li>
              <li>Set băița de a doua zi</li>
            </ul>
            <div className={styles.heroCardLine} />
            <div className={styles.heroCardNote}>
              Spune-ne data evenimentului și îți facem o propunere pe stilul tău.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.h2}>De ce Glowing Luxe</h2>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Aesthetic premium</div>
              <div className={styles.cardText}>
                Detalii fine, materiale elegante și finisaje gold.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Pachete flexibile</div>
              <div className={styles.cardText}>
                Alegi ce ai nevoie: basic, premium sau complet.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Personalizare</div>
              <div className={styles.cardText}>
                Culori, fonturi, etichete și tematică exact ca la voi.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
