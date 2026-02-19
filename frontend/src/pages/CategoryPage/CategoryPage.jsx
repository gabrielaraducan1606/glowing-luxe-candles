import { useEffect,  useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CATALOG } from "../../data/catalog";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { group, slug } = useParams();
  const data = CATALOG?.[group]?.[slug];

  // lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState([]);
  const [lbIndex, setLbIndex] = useState(0);

  const trackRef = useRef(null);
  const drag = useRef({
    active: false,
    startX: 0,
    currentX: 0,
    startIndex: 0
  });

  const hasData = !!data;

  const openLightbox = (images, startIndex = 0) => {
    const imgs = Array.isArray(images) ? images.filter(Boolean) : [];
    if (imgs.length === 0) return;
    setLbImages(imgs);
    setLbIndex(Math.max(0, Math.min(startIndex, imgs.length - 1)));
    setLbOpen(true);
  };

  const closeLightbox = () => {
    setLbOpen(false);
    setLbImages([]);
    setLbIndex(0);
  };

  const canPrev = lbIndex > 0;
  const canNext = lbIndex < lbImages.length - 1;

  const prev = () => setLbIndex((i) => Math.max(0, i - 1));
  const next = () => setLbIndex((i) => Math.min(lbImages.length - 1, i + 1));

  // ESC + arrows
  useEffect(() => {
    if (!lbOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lbOpen, lbImages.length]);

  // keep transform in sync
  useEffect(() => {
    if (!lbOpen || !trackRef.current) return;
    trackRef.current.style.transform = `translateX(${-lbIndex * 100}%)`;
  }, [lbOpen, lbIndex]);

  const onPointerDown = (e) => {
    if (!lbOpen || lbImages.length <= 1) return;
    const track = trackRef.current;
    if (!track) return;

    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.currentX = e.clientX;
    drag.current.startIndex = lbIndex;

    track.setPointerCapture?.(e.pointerId);
    track.classList.add(styles.dragging);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;

    drag.current.currentX = e.clientX;
    const dx = drag.current.currentX - drag.current.startX;

    // translate in %
    const width = track.getBoundingClientRect().width || 1;
    const deltaPct = (dx / width) * 100;

    track.style.transition = "none";
    track.style.transform = `translateX(${-(drag.current.startIndex * 100) + deltaPct}%)`;
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;

    drag.current.active = false;
    track.classList.remove(styles.dragging);

    const dx = drag.current.currentX - drag.current.startX;
    const width = track.getBoundingClientRect().width || 1;
    const threshold = Math.max(50, width * 0.12); // swipe sensitivity

    track.style.transition = "";

    if (dx > threshold && canPrev) {
      prev();
    } else if (dx < -threshold && canNext) {
      next();
    } else {
      // snap back
      track.style.transform = `translateX(${-lbIndex * 100}%)`;
    }
  };

  if (!hasData) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="h2">Categoria nu există</h2>
          <p className="p">
            Nu ai adăugat încă produse pentru {group}/{slug}.
          </p>
          <Link className="btnGold" to="/">
            Înapoi acasă
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.page}`}>
      <div className="container">
        <h1 className="h2">{data.title}</h1>
        {data.description && <p className="p">{data.description}</p>}

        <div className={styles.grid}>
          {data.products.map((p) => (
            <div className={`card ${styles.card}`} key={p.id}>
              {p.images?.[0] ? (
                <button
                  type="button"
                  className={styles.thumbBtn}
                  onClick={() => openLightbox(p.images, 0)}
                  aria-label={`Deschide pozele pentru ${p.name}`}
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className={styles.thumb}
                    loading="lazy"
                  />
                  {p.images?.length > 1 && (
                    <span className={styles.multiBadge}>{p.images.length} poze</span>
                  )}
                </button>
              ) : (
                <div className={styles.noImg}>Fără poză</div>
              )}

              <div className="cardTitle">{p.name}</div>

              {(p.priceFrom != null || p.priceTo != null) && (
                <div className="cardText" style={{ marginTop: 6 }}>
                  <strong>Preț:</strong>{" "}
                  {p.priceFrom != null ? `de la ${p.priceFrom}` : ""}
                  {p.priceTo != null ? ` până la ${p.priceTo}` : ""}
                  {p.unit ? ` ${p.unit}` : ""}
                </div>
              )}

              {p.details?.length > 0 && (
                <ul className="list" style={{ marginTop: 10 }}>
                  {p.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}

              {/* thumbnails mici sub poza principală (opțional) */}
              {p.images?.length > 1 && (
                <div className={styles.miniRow}>
                  {p.images.slice(0, 6).map((src, i) => (
                    <button
                      type="button"
                      key={`${p.id}-mini-${i}`}
                      className={styles.miniBtn}
                      onClick={() => openLightbox(p.images, i)}
                      aria-label={`Deschide poza ${i + 1}`}
                    >
                      <img src={src} alt="" className={styles.miniImg} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <Link className="btnGold" to={`/contact?prod=${encodeURIComponent(p.name)}`}>
                  Cere ofertă
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lbOpen && (
        <div className={styles.lbOverlay} role="dialog" aria-modal="true" onMouseDown={closeLightbox}>
          <div className={styles.lb} onMouseDown={(e) => e.stopPropagation()}>
            <button className={styles.lbClose} onClick={closeLightbox} aria-label="Închide">
              ✕
            </button>

            <div className={styles.lbStage}>
              <div
                ref={trackRef}
                className={styles.lbTrack}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                {lbImages.map((src, i) => (
                  <div className={styles.lbSlide} key={`${src}-${i}`}>
                    <img className={styles.lbImg} src={src} alt={`Imagine ${i + 1}`} />
                  </div>
                ))}
              </div>

              {lbImages.length > 1 && (
                <>
                  <button
                    className={`${styles.lbNav} ${styles.left}`}
                    onClick={prev}
                    disabled={!canPrev}
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    className={`${styles.lbNav} ${styles.right}`}
                    onClick={next}
                    disabled={!canNext}
                    aria-label="Următor"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {lbImages.length > 1 && (
              <div className={styles.dots} aria-label="Navigare imagini">
                {lbImages.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === lbIndex ? styles.dotActive : ""}`}
                    onClick={() => setLbIndex(i)}
                    aria-label={`Mergi la imaginea ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
