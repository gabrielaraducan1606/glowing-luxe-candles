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

  // ✅ FIXED useEffect
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
                <button
                  className={styles.thumbBtn}
                  onClick={() => openLightbox(p.images, 0)}
                >
                  <img src={p.images?.[0]} className={styles.thumb} />
                </button>

                <div className={styles.cardTitle}>{p.name}</div>

                <div className={styles.ctaWrap}>
                  <a className={styles.btnGold} href={whatsappLink} target="_blank">
                    <FaWhatsapp /> Cere ofertă
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {lbOpen && (
        <div className={styles.lbOverlay} onMouseDown={closeLightbox}>
          <div className={styles.lb} onMouseDown={(e) => e.stopPropagation()}>
            <button className={styles.lbClose} onClick={closeLightbox}>
              ✕
            </button>

            <div className={styles.lbStage}>
              <div
                ref={trackRef}
                className={styles.lbTrack}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                {lbImages.map((src, i) => (
                  <div className={styles.lbSlide} key={i}>
                    <img src={src} className={styles.lbImg} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}