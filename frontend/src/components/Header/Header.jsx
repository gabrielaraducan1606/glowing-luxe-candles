import { useMemo, useState, useCallback, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

const INITIAL_EXPANDED = { nunta: false, botez: false, copii: false, mot: false };

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(INITIAL_EXPANDED);

  const menu = useMemo(
    () => [
      {
        key: "nunta",
        label: "Nuntă",
        items: [
          { label: "Invitații", slug: "invitatii" },
          { label: "Invitații digitale", slug: "invitatii-digitale" },
          { label: "Mărturii", slug: "marturii" },
          { label: "Aranjamente", slug: "aranjamente" },
          { label: "Plicuri cu bani", slug: "plicuri-cu-bani" },
          { label: "Panou intrare invitați", slug: "panou-intrare-invitati" },
          { label: "Tăviță mire", slug: "tavita-mire" },
          { label: "Tăviță mireasă", slug: "tavita-mireasa" },
          { label: "Aranjamente mașină", slug: "aranjamente-masina" }
        ]
      },
      {
        key: "botez",
        label: "Botez",
        items: [
          { label: "Invitații", slug: "invitatii" },
          { label: "Mărturii", slug: "marturii" },
          { label: "Aranjamente", slug: "aranjamente" },
          { label: "Plicuri cu bani", slug: "plicuri-cu-bani" },
          { label: "Panou invitați", slug: "panou-invitati" },
          { label: "Trusou", slug: "trusou" },
          { label: "Băița de a doua zi", slug: "baita-a-doua-zi" },
          { label: "Haine bebe", slug: "haine-bebe" }
        ]
      },
      { key: "mot", label: "Moț", items: [{ label: "Tăviță moț", slug: "tavita-mot" }] },
      {
        key: "copii",
        label: "Copii",
        items: [
          { label: "Elemente decorative tort & candy bar", slug: "elemente-decorative-tort" },
          { label: "Baloane heliu", slug: "baloane-heliu" },
          { label: "Baloane", slug: "baloane" },
          { label: "Torturi grădiniță/creșă", slug: "tort-gradinita" }
        ]
      }
    ],
    []
  );

  const closeMenu = useCallback(() => {
    // evită warning-ul aria-hidden/focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpen(false);
    setExpanded(INITIAL_EXPANDED);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) setExpanded(INITIAL_EXPANDED);
      return next;
    });
  }, []);

  const toggleSection = useCallback((key) => {
    setExpanded((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  return (
    <header className="header">
      <div className="container headerRow">
        <Link to="/" className="brandLink" aria-label="Glowing Luxe Candles" onClick={closeMenu}>
          <img src={logo} className="logoImg" alt="Glowing Luxe Candles" />
        </Link>

        <button className="burger" aria-label="Open menu" aria-expanded={open} onClick={toggleMenu}>
          <span className={`burgerLine ${open ? "x1" : ""}`} />
          <span className={`burgerLine ${open ? "x2" : ""}`} />
          <span className={`burgerLine ${open ? "x3" : ""}`} />
        </button>
      </div>

      <div className={`menuOverlay ${open ? "open" : ""}`} onClick={closeMenu} />

      {/* scoatem aria-hidden ca să nu mai apară warning-ul */}
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className={styles.drawerTop}>
          <Link to="/" onClick={closeMenu} className={styles.drawerLogo} aria-label="Home">
            <img src={logo} alt="Glowing Luxe Candles" />
          </Link>

          <button className={styles.drawerClose} onClick={closeMenu} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="drawerNav">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => `drawerLink ${isActive ? "active" : ""}`}
          >
            Prezentare
          </NavLink>

          <div className="drawerGroup">
            {menu.map((group) => (
              <div key={group.key} className="drawerGroupBlock">
                <button
                  className="drawerGroupBtn"
                  onClick={() => toggleSection(group.key)}
                  aria-expanded={!!expanded[group.key]}
                >
                  <span>{group.label}</span>
                  <span className={`chev ${expanded[group.key] ? "up" : ""}`}>▾</span>
                </button>

                <div className={`drawerSub ${expanded[group.key] ? "open" : ""}`}>
                  {group.items.map((it) => (
                    <Link
                      key={it.slug}
                      className="drawerSubLink"
                      to={`/${group.key}/${it.slug}`}
                      onClick={closeMenu}
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) => `drawerLink ${isActive ? "active" : ""}`}
          >
            Contact
          </NavLink>
        </nav>

        <div className="drawerCta">
          <Link to="/contact" className="btnGold" onClick={closeMenu}>
            Cere ofertă
          </Link>
        </div>
      </aside>
    </header>
  );
}
