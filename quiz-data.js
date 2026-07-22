// =====================================================================
//  Contenu du quiz — Le management en France en 2026
//  Source unique de verite : editez ce fichier pour changer les questions.
//  `correct` = index des bonnes reponses (0 = A, 1 = B, 2 = C, 3 = D).
//  `multi: true` => plusieurs bonnes reponses possibles.
// =====================================================================

module.exports = [
  {
    theme: "Engagement",
    multi: false,
    q: "Selon l'étude Gallup 2026, comment a évolué le taux d'engagement mondial des managers entre 2022 et 2025 ?",
    options: [
      "Il a progressé de 22 % à 31 %",
      "Il a chuté de 31 % à 22 %",
      "Il est resté stable, autour de 30 %",
      "Il a chuté de 22 % à 8 %"
    ],
    correct: [1],
    fig: "−9 pts",
    figLabel: "d'engagement chez les managers en 3 ans, dont −5 pts sur la seule année 2024-2025 — la plus forte baisse annuelle jamais mesurée.",
    explain: "L'engagement des managers passe de 31 % à 22 %. C'est l'effet « sandwich » : pris entre la pression du haut et le désengagement des équipes. En France, l'engagement des collaborateurs stagne autour de 8 %.",
    source: "Gallup — State of the Global Workplace 2026"
  },
  {
    theme: "Parité",
    multi: false,
    q: "En 2026, les femmes représentent 48 % des managers en France. Quelle est leur part dans les comités de direction (CODIR / COMEX) ?",
    options: [
      "48 % — la parité est atteinte",
      "40 %",
      "24 %",
      "15 %"
    ],
    correct: [2],
    fig: "24 %",
    figLabel: "de femmes dans les comités de direction, alors qu'elles sont 48 % à l'échelon manager. Le plafond de verre se situe au sommet.",
    explain: "La quasi-parité au niveau manager (48 %) ne se traduit pas en haut de la pyramide : seule une place sur quatre en comité de direction revient à une femme.",
    source: "Étude 2026 relayée par Mediavenir"
  },
  {
    theme: "Charge mentale",
    multi: true,
    q: "À propos de la charge de travail des cadres managers français en 2026, quelles affirmations sont exactes ?",
    options: [
      "31 % déclarent travailler 50 heures par semaine ou plus",
      "51 % travaillent régulièrement sous pression",
      "3 managers sur 4 continuent à penser au travail en dehors du travail",
      "Une majorité déconnecte totalement le week-end"
    ],
    correct: [0, 1, 2],
    fig: "3 / 4",
    figLabel: "managers pensent encore au travail en dehors des heures. La déconnexion totale (option D) reste minoritaire.",
    explain: "Enquête menée auprès de 1 200 managers. La charge déborde largement le temps de travail : 31 % à 50h+/semaine, 51 % sous pression régulière, 3 sur 4 y pensent hors travail. L'affirmation D est fausse.",
    source: "Lab des Futurs × Ipsos, 2026"
  },
  {
    theme: "Organisation du travail",
    multi: false,
    q: "Quelle est la tendance dominante des entreprises françaises sur le télétravail en 2026 ?",
    options: [
      "94 % prévoient de maintenir le statu quo (ni réduction ni suppression)",
      "La majorité impose un retour à 100 % présentiel",
      "La plupart basculent en « full remote »",
      "50 % suppriment au moins un jour de télétravail"
    ],
    correct: [0],
    fig: "94 %",
    figLabel: "des entreprises maintiennent leur politique de télétravail en 2026. Le sujet se stabilise après le léger recul de 2025.",
    explain: "En 2025, seules 9 % des entreprises ont réduit le télétravail : 2026 confirme la stabilité. Utilisé par près d'un salarié sur deux (49 %), il affiche 92 % de satisfaction.",
    source: "Capstan / SFR Business, 2026"
  },
  {
    theme: "IA & compétences",
    multi: true,
    q: "À propos de l'IA et du management en France en 2026, quelles affirmations sont exactes ?",
    options: [
      "Plus de 73 % des grandes entreprises ont déployé ou expérimentent un assistant IA interne",
      "La France est en tête en Europe avec plus de 166 000 offres d'emploi liées à l'IA en 2026",
      "Le « prompt engineering » figure parmi les compétences IA les plus demandées aux managers",
      "Se former à l'IA impose désormais un niveau de data scientist"
    ],
    correct: [0, 1, 2],
    fig: "73 %+",
    figLabel: "des grandes entreprises françaises ont déployé ou testent un assistant IA interne. Piloter l'IA devient une compétence managériale de base.",
    explain: "L'IA se généralise (73 %+) et tire l'emploi (166 000+ offres). Le prompt engineering est clé, mais les formations pour managers sont conçues sans prérequis technique : il s'agit de piloter, pas de coder. L'affirmation D est fausse.",
    source: "Baromètre Syntec Numérique / Dynexio, 2026"
  }
];
