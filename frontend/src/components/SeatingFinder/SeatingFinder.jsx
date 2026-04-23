import React, { useMemo, useState } from "react";
import styles from "./SeatingFinder.module.css";

const GUESTS = [
  { name: "Bărzoiu Laurențiu", table: "Masa 1" },
  { name: "Bărzoiu Alexandra", table: "Masa 1" },
  { name: "Birou Marian", table: "Masa 1" },
  { name: "Birou Corina", table: "Masa 1" },
  { name: "Petcovici Dorina", table: "Masa 1" },
  { name: "Petcovici Andrei", table: "Masa 1" },
  { name: "Petcovici Yanis", table: "Masa 1" },
  { name: "Manole Bobi", table: "Masa 1" },
  { name: "Manole Valentina", table: "Masa 1" },
  { name: "Manole Ana", table: "Masa 1" },

  { name: "Bumbu Dragoș", table: "Masa 2" },
  { name: "Bumbu Andrada", table: "Masa 2" },
  { name: "Crantea Bebe", table: "Masa 2" },
  { name: "Crantea Andreea", table: "Masa 2" },
  { name: "Zaharia Veronica", table: "Masa 2" },
  { name: "Zaharia Adrian", table: "Masa 2" },
  { name: "Dragu Răzvan", table: "Masa 2" },
  { name: "Dragu Mădălina", table: "Masa 2" },
  { name: "Zahiu Sebi", table: "Masa 2" },
  { name: "Zahiu Cosmina", table: "Masa 2" },

  { name: "Tănăsoiu Ionuț", table: "Masa 3" },
  { name: "Tănăsoiu Irina", table: "Masa 3" },
  { name: "Rădulescu Costel", table: "Masa 3" },
  { name: "Burca Fytz", table: "Masa 3" }, 
  { name: "Filimon Aurel", table: "Masa 3" },
  { name: "Filimon Mihaela", table: "Masa 3" },
  { name: "Zloteanu Florin", table: "Masa 3" },
  { name: "Zloteanu Andrea", table: "Masa 3" },
  { name: "Bîrsan Florin", table: "Masa 3" },
  { name: "Bîrsan Mara", table: "Masa 3" },

  { name: "Melincovici Iulian", table: "Masa 4" },
  { name: "Melincovici Mihaela", table: "Masa 4" },
  { name: "Melincovici Cătălin", table: "Masa 4" },
  { name: "Melincovici Georgiana", table: "Masa 4" },
  { name: "Melincovici Vladimir", table: "Masa 4" },
  { name: "Melincovici Anghel", table: "Masa 4" },
  { name: "Melincovici Elena", table: "Masa 4" },
  { name: "Stoica Dorin", table: "Masa 4" },
  { name: "Stoica Ana", table: "Masa 4" },

  { name: "Bodo Cosmin", table: "Masa 5" },
  { name: "Toader Angelica", table: "Masa 5" },
  { name: "Dobre Constantin", table: "Masa 5" },
  { name: "Dobre Geanina", table: "Masa 5" },
  { name: "Zaharia Sorin", table: "Masa 5" },
  { name: "Zaharia Geanina", table: "Masa 5" },
  { name: "Cristache Sandu", table: "Masa 5" },
  { name: "Cristache Alina", table: "Masa 5" },
  { name: "David Ion", table: "Masa 5" },
  { name: "David Rodica", table: "Masa 5" },

  { name: "Aldea Marina", table: "Masa 6" },
  { name: "Aldea Alin", table: "Masa 6" },
  { name: "Aldea Ana", table: "Masa 6" },
  { name: "Bășcău Denis", table: "Masa 6" },
  { name: "Bășcău Alina", table: "Masa 6" },
  { name: "Dobrin Cosmin", table: "Masa 6" },
  { name: "Giurea Ștefan", table: "Masa 6" },
  { name: "Simionescu Iulian", table: "Masa 6" },
  { name: "Simionescu Andreea", table: "Masa 6" },

  { name: "Banu Daniela", table: "Masa 7" },
  { name: "Banu Marina", table: "Masa 7" },
  { name: "Ababei Constantin", table: "Masa 7" },
  { name: "Novac Ioana", table: "Masa 7" },
  { name: "Ailincăi Florin", table: "Masa 7" },
  { name: "Ailincăi Ștefania", table: "Masa 7" },
  { name: "Ailincăi Ana", table: "Masa 7" },
  { name: "Frățilă Crina", table: "Masa 7" },
  { name: "Racoveanu Ciprian", table: "Masa 7" },
  { name: "Racoveanu Florentina", table: "Masa 7" },

  { name: "Roman Constantin", table: "Masa 8" },
  { name: "Roman Georgiana", table: "Masa 8" },
  { name: "Ifrim Laura", table: "Masa 8" },
  { name: "Ifrim Florica", table: "Masa 8" },
  { name: "Dobrinoiu Iustin", table: "Masa 8" },
  { name: "Dobrinoiu Adelina", table: "Masa 8" },
  { name: "Grigore Nicu", table: "Masa 8" },
  { name: "Grigore Ernestina", table: "Masa 8" },

  { name: "Tudorache Laurențiu", table: "Masa 9" },
  { name: "Tudorache Paula", table: "Masa 9" },
  { name: "Gheorghe Carmen", table: "Masa 9" },
  { name: "Gheorghe Renata", table: "Masa 9" },
  { name: "Gheorghe Costel", table: "Masa 9" },
  { name: "Gheorghe Sofia", table: "Masa 9" },

  { name: "Grădinaru Andreea", table: "Masa 10" },
  { name: "Matei Roxana", table: "Masa 10" },
  { name: "Lungu Florin", table: "Masa 10" },
  { name: "Căpățână Andrei", table: "Masa 10" },
  { name: "Andraș Marius", table: "Masa 10" },
  { name: "Andraș Diana", table: "Masa 10" },
];

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t")
    .trim();
}

export default function SeatingFinderGenerated() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) return [];

    return GUESTS.filter((guest) =>
      normalizeText(guest.name).includes(normalizedQuery)
    ).sort((a, b) => a.name.localeCompare(b.name, "ro"));
  }, [query]);

  return (
    <div className={styles.page}>
      <div className={styles.overlay} />

      <div className={styles.card}>
        <div className={styles.kicker}>Artfest Atelier Evenimente</div>

        <h1 className={styles.title}>Organizare la mese</h1>

        <p className={styles.subtitle}>
          Caută numele invitatului și vei vedea masa la care este repartizat.
        </p>

        <input
          type="text"
          placeholder="Ex: Andrei Popescu"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />

        {!query.trim() ? (
          <div className={styles.infoBox}>
            Introdu numele complet sau doar o parte din el. Căutarea merge și
            fără diacritice.
          </div>
        ) : results.length === 0 ? (
          <div className={styles.warningBox}>
            Nu am găsit niciun rezultat pentru <strong>{query}</strong>.
            <br />
            Verifică ortografia sau încearcă doar numele de familie.
          </div>
        ) : (
          <div className={styles.resultsSection}>
            <div className={styles.resultsCount}>
              {results.length} rezultat{results.length > 1 ? "e" : ""}
            </div>

            <div className={styles.resultsList}>
              {results.map((guest) => (
                <div
                  key={`${guest.name}-${guest.table}`}
                  className={styles.resultCard}
                >
                  <div>
                    <div className={styles.guestName}>{guest.name}</div>
                    <div className={styles.resultLabel}>Repartizat la</div>
                  </div>

                  <div className={styles.tableBadge}>{guest.table}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <div>Total invitați introduși: {GUESTS.length}</div>
         
        </div>
      </div>
    </div>
  );
}