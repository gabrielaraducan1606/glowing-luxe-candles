import nunta_invitatii from "./nunta/invitatii.js";
import nunta_invitatii_digitale from "./nunta/invitatii-digitale.js";
import nunta_marturii from "./nunta/marturii.js";
import nunta_aranjamente from "./nunta/aranjamente.js";
import nunta_panou_intrare_invitati from "./nunta/panou-intrare-invitati.js";
import nunta_tavita_mire from "./nunta/tavita-mire.js";
import nunta_tavita_mireasa from "./nunta/tavita-mireasa.js";
import nunta_aranjamente_masina from "./nunta/aranjamente-masina.js";

// ✅ Plicuri cu bani (Nuntă)
import nunta_plicuri_cu_bani from "./nunta/plicuri-bani.js";

import botez_invitatii from "./botez/invitatii.js";
import botez_marturii from "./botez/marturii.js";
import botez_aranjamente from "./botez/aranjamente.js";
import botez_panou_invitati from "./botez/panou-invitati.js";
import botez_trusou from "./botez/trusou.js";
import botez_baita_a_doua_zi from "./botez/baita-a-doua-zi.js";
import botez_haine_bebe from "./botez/haine-bebe.js";

// ✅ NOU: Aranjamente cristelniță (Botez)
import botez_aranjamente_cristelnita from "./botez/aranjamente-cristelnita.js";

// ✅ Plicuri cu bani (Botez)
import botez_plicuri_cu_bani from "./botez/plicuri-bani.js";

// ✅ MOT
import mot_tavita_mot from "./mot/tavita-mot.js";

import copii_elemente_decorative_tort from "./copii/elemente-decorative-tort.js";
import copii_baloane_heliu from "./copii/baloane-heliu.js";
import copii_baloane from "./copii/baloane.js";
import copii_tort_gradinita from "./copii/tort-gradinita.js";

export const CATALOG = {
  nunta: {
    invitatii: nunta_invitatii,
    "invitatii-digitale": nunta_invitatii_digitale,
    marturii: nunta_marturii,
    aranjamente: nunta_aranjamente,

    "plicuri-cu-bani": nunta_plicuri_cu_bani,

    "panou-intrare-invitati": nunta_panou_intrare_invitati,
    "tavita-mire": nunta_tavita_mire,
    "tavita-mireasa": nunta_tavita_mireasa,
    "aranjamente-masina": nunta_aranjamente_masina
  },

  botez: {
    invitatii: botez_invitatii,
    marturii: botez_marturii,
    aranjamente: botez_aranjamente,

    // ✅ NOU
    "aranjamente-cristelnita": botez_aranjamente_cristelnita,

    "plicuri-cu-bani": botez_plicuri_cu_bani,
    "panou-invitati": botez_panou_invitati,
    trusou: botez_trusou,
    "baita-a-doua-zi": botez_baita_a_doua_zi,
    "haine-bebe": botez_haine_bebe
  },

  mot: {
    "tavita-mot": mot_tavita_mot
  },

  copii: {
    "elemente-decorative-tort": copii_elemente_decorative_tort,
    "baloane-heliu": copii_baloane_heliu,
    baloane: copii_baloane,
    "tort-gradinita": copii_tort_gradinita
  }
};