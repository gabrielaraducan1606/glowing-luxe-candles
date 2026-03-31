import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { CATALOG } from "../../data/catalog";
import styles from "./CategoryPage.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function CategoryPage() {
  const { group, slug } = useParams();
  const data = CATALOG?.[group]?.[slug];

  const WHATSAPP_NUMBER = "40760565147";

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
  const isDigitalInvitation = slug === "invitatii-digitale";

  const openLightbox = (images, startIndex = 0) => {
    const imgs = Array.isArray(images) ? images.filter(Boolean) : [];
    if (imgs.length === 0) return;
    setLbImages(imgs);
    setLbIndex(Math.max(0, Math.min(startIndex, imgs.length - 1)));
    setLbOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLbOpen(false);
    setLbImages([]);
    setLbIndex(0);
  }, []);

  const canPrev = lbIndex > 0;
  const canNext = lbIndex < lbImages.length - 1;

  const prev = useCallback(() => {
    setLbIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setLbIndex((i) => Math.min(lbImages.length - 1, i + 1));
  }, [lbImages.length]);

  const buildWhatsappLinkForProduct = (p) => {
    const categoryTitle = data?.title || `${group}/${slug}`;

    const priceText =
      p.priceFrom != null || p.priceTo != null
        ? `Preț: ${p.priceFrom != null ? `de la ${p.priceFrom}` : ""}${
            p.priceTo != null ? ` până la ${p.priceTo}` : ""
          }${p.unit ? ` ${p.unit}` : ""}`
        : "";

    const detailsText =
      Array.isArray(p.details) && p.details.length
        ? `Detalii:\n- ${p.details.slice(0, 6).join("\n- ")}`
        : "";

    const msg = [
      "Bună ziua!",
      "",
      "Aș dori o ofertă pentru produsul:",
      `• ${p.name}`,
      `Categorie: ${categoryTitle}`,
      priceText || null,
      detailsText || null,
      "",
      "Data evenimentului: ________",
      "Localitate: ________",
      "Cantitate / nr. invitați: ________",
      "Tema/culori: ________",
      "",
      "Mulțumesc!"
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    if (!lbOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lbOpen, prev, next, closeLightbox]);

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
    const threshold = Math.max(50, width * 0.12);

    track.style.transition = "";

    if (dx > threshold && canPrev) {
      prev();
    } else if (dx < -threshold && canNext) {
      next();
    } else {
      track.style.transform = `translateX(${-lbIndex * 100}%)`;
    }
  };

  if (!hasData) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <h2 className={styles.title}>Categoria nu există</h2>
          <p className={styles.description}>
            Nu ai adăugat încă produse pentru {group}/{slug}.
          </p>
          <Link className={styles.btnGold} to="/">
            Înapoi acasă
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{data.title}</h1>
        {data.description && <p className={styles.description}>{data.description}</p>}

        <div className={styles.grid}>
          {data.products.map((p) => {
            const whatsappLink = buildWhatsappLinkForProduct(p);

            return (
              <div className={styles.card} key={p.id}>
                {p.images?.[0] ? (
                  <button
                    type="button"
                    className={styles.thumbBtn}
                    onClick={() => openLightbox(p.images, 0)}
                    aria-label={`Deschide imaginea pentru ${p.name}`}
                  >
                    <div
                      className={`${styles.thumbFrame} ${
                        isDigitalInvitation
                          ? styles.thumbFramePortrait
                          : styles.thumbFrameStandard
                      }`}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className={`${styles.thumb} ${
                          isDigitalInvitation ? styles.thumbContain : styles.thumbCover
                        }`}
                        loading="lazy"
                      />
                    </div>

                    {p.images?.length > 1 && (
                      <span className={styles.multiBadge}>{p.images.length} poze</span>
                    )}
                  </button>
                ) : (
                  <div className={styles.noImg}>Fără poză</div>
                )}

                <div className={styles.cardTitle}>{p.name}</div>

                {(p.priceFrom != null || p.priceTo != null) && (
                  <div className={styles.cardText}>
                    <strong>Preț:</strong>{" "}
                    {p.priceFrom != null ? `de la ${p.priceFrom}` : ""}
                    {p.priceTo != null ? ` până la ${p.priceTo}` : ""}
                    {p.unit ? ` ${p.unit}` : ""}
                  </div>
                )}

                {p.details?.length > 0 && (
                  <ul className={styles.list}>
                    {p.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}

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

                <div className={styles.ctaWrap}>
                  <a
                    className={styles.btnGold}
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Cere ofertă pe WhatsApp pentru ${p.name}`}
                  >
                    <FaWhatsapp />
                    Cere ofertă
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {lbOpen && (
        <div
          className={styles.lbOverlay}
          role="dialog"
          aria-modal="true"
          onMouseDown={closeLightbox}
        >
          <div
            className={`${styles.lb} ${
              isDigitalInvitation ? styles.lbPortrait : styles.lbStandard
            }`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lbClose}
              onClick={closeLightbox}
              aria-label="Închide"
              type="button"
            >
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
                    <img
                      src={src}
                      className={styles.lbImg}
                      alt={`Imagine ${i + 1}`}
                    />
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
                    type="button"
                  >
                    ‹
                  </button>

                  <button
                    className={`${styles.lbNav} ${styles.right}`}
                    onClick={next}
                    disabled={!canNext}
                    aria-label="Următor"
                    type="button"
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
                    type="button"
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