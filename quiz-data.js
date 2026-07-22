// =====================================================================
//  Contenu des quiz — Console de formation 2026
//  Chaque quiz : { id, title, subtitle, icon, questions:[...] }
//  Question : correct = index des bonnes reponses (0=A,1=B,2=C,3=D).
//  multi:true => plusieurs bonnes reponses possibles.
//  (Le "Mur de mots" est configure dans server.js, pas ici.)
// =====================================================================

module.exports = [
  {
    id: 'management',
    title: 'Le management en France · 2026',
    subtitle: '5 questions · statistiques clés',
    icon: '📊',
    questions: [
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
        options: ["48 % — la parité est atteinte", "40 %", "24 %", "15 %"],
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
    ]
  },

  {
    id: 'ia-travail',
    title: "L'IA au travail en France · 2026",
    subtitle: '10 questions · IA & monde du travail',
    icon: '🤖',
    questions: [
      {
        theme: "Adoption",
        multi: false,
        q: "En 2026, quelle part des salariés du secteur privé utilise l'IA générative dans son travail ?",
        options: ["Environ 12 %", "Environ 28 %", "Près d'un sur deux (≈ 47 %)", "Plus de 80 %"],
        correct: [2],
        fig: "≈ 47 %",
        figLabel: "des salariés du privé utilisent l'IA générative au travail, dont 24 % au moins une fois par semaine.",
        explain: "L'adoption a explosé : près d'un salarié sur deux y a recours. Mais l'usage vraiment régulier (hebdomadaire) ne concerne encore qu'un quart d'entre eux.",
        source: "KPMG / OpinionWay, 2026"
      },
      {
        theme: "Inégalités d'usage",
        multi: false,
        q: "78 % des cadres utilisent l'IA au travail. Quelle est la proportion chez les ouvriers ?",
        options: ["29 %", "48 %", "63 %", "75 %"],
        correct: [0],
        fig: "78 % vs 29 %",
        figLabel: "d'usage de l'IA entre cadres et ouvriers : la fracture est d'abord socioprofessionnelle.",
        explain: "L'IA se diffuse très inégalement : quasi généralisée chez les cadres, elle reste minoritaire chez les ouvriers (29 %). Un enjeu d'équité pour les managers.",
        source: "Étude adoption IA France, 2026"
      },
      {
        theme: "Formation",
        multi: false,
        q: "Quelle part des salariés français déclare avoir reçu une formation à l'IA en entreprise ?",
        options: ["12 %", "31 %", "54 %", "76 %"],
        correct: [0],
        fig: "12 %",
        figLabel: "des salariés seulement ont été formés à l'IA, alors que l'AI Act impose un socle de compétences (« AI literacy »).",
        explain: "L'écart est béant entre l'usage (près d'un sur deux) et la formation (12 %). C'est LE principal enjeu RH de 2026.",
        source: "Baromètre formation IA, 2026"
      },
      {
        theme: "Shadow AI",
        multi: false,
        q: "Le « shadow AI » désigne l'usage d'outils d'IA sans en informer sa hiérarchie. Quelle part des collaborateurs est concernée ?",
        options: ["18 %", "35 %", "68 %", "92 %"],
        correct: [2],
        fig: "68 %",
        figLabel: "des collaborateurs utilisent l'IA générative sans prévenir leur hiérarchie — le « shadow AI ».",
        explain: "Deux tiers des salariés utilisent l'IA « en douce ». D'où l'intérêt d'une charte d'usage claire plutôt que d'une interdiction inapplicable.",
        source: "Étude Shadow AI, 2026"
      },
      {
        theme: "Productivité",
        multi: false,
        q: "Selon l'INSEE, combien d'heures par semaine gagnent en moyenne les cadres qui utilisent Copilot ?",
        options: ["Environ 2 heures", "Environ 5 heures", "Environ 11 heures", "Environ 20 heures"],
        correct: [2],
        fig: "11 h / sem.",
        figLabel: "gagnées par les cadres utilisateurs de Copilot, selon l'INSEE.",
        explain: "Le gain de temps est réel et mesurable, mais concentré sur les profils déjà les plus équipés et formés — ce qui creuse encore l'écart d'usage.",
        source: "INSEE, 2026"
      },
      {
        theme: "Craintes",
        multi: false,
        q: "Quelle part des salariés français craint FORTEMENT d'être remplacée par l'IA en 2026 ?",
        options: ["Environ 10 %", "Environ 30 %", "Environ 55 %", "Environ 77 %"],
        correct: [0],
        fig: "≈ 10 %",
        figLabel: "des salariés craignent fortement d'être remplacés (+2 pts vs 2025). La crainte se concentre chez les moins de 40 ans.",
        explain: "La peur « forte » reste minoritaire (1 sur 10), même si 45 % des salariés et 61 % des cadres redoutent un remplacement au moins partiel.",
        source: "ADP — People at Work 2026"
      },
      {
        theme: "Automatisation",
        multi: false,
        q: "Selon la Direction générale du Trésor, quelle part des emplois est jugée TOTALEMENT remplaçable par l'IA ?",
        options: ["5 %", "18 %", "35 %", "50 %"],
        correct: [0],
        fig: "5 %",
        figLabel: "des emplois seulement sont totalement automatisables : la majorité évolue par recomposition des tâches.",
        explain: "L'IA transforme les métiers plus qu'elle ne les supprime : la plupart des postes voient certaines tâches automatisées, pas l'emploi entier.",
        source: "Direction générale du Trésor, 2026"
      },
      {
        theme: "IA en entreprise",
        multi: true,
        q: "Quelles affirmations sont exactes concernant l'IA dans les entreprises françaises en 2026 ?",
        options: [
          "Les entreprises qui déploient l'IA rapportent en moyenne +15 à 30 % de productivité sur leurs processus clés",
          "66 % des organisations déployant l'IA constatent une hausse mesurable de productivité",
          "Le manque de compétences internes est le 1er frein cité par les dirigeants (61 %)",
          "La quasi-totalité des PME dispose d'une stratégie IA formalisée"
        ],
        correct: [0, 1, 2],
        fig: "+15 à 30 %",
        figLabel: "de productivité pour les entreprises qui déploient l'IA — mais le manque de compétences reste le 1er frein.",
        explain: "Les bénéfices sont documentés, mais freinés par les compétences : 60 % des PME n'ont AUCUNE stratégie IA formalisée. L'affirmation D est donc fausse.",
        source: "McKinsey / baromètres IA entreprise, 2026"
      },
      {
        theme: "Cadre & gouvernance",
        multi: true,
        q: "À propos de l'encadrement de l'IA au travail en 2026, quelles affirmations sont exactes ?",
        options: [
          "L'AI Act impose un niveau minimal de compétences IA (« AI literacy ») aux salariés concernés",
          "Une charte encadrant l'usage de ChatGPT, Copilot… est devenue un standard de gouvernance",
          "Cyberassureurs et CNIL poussent à formaliser ces règles",
          "Aucune obligation légale ne concerne l'IA en entreprise"
        ],
        correct: [0, 1, 2],
        fig: "AI Act",
        figLabel: "impose désormais un socle de compétences IA ; la charte d'usage devient incontournable (RGPD, AI Act, NIS2).",
        explain: "L'IA au travail est de plus en plus encadrée : l'affirmation D est fausse. La charte IA est un document de gouvernance clé en 2026.",
        source: "AI Act (UE) & CNIL, 2026"
      },
      {
        theme: "Opinion",
        multi: false,
        q: "Quelle part des Français pense que l'IA va détruire plus d'emplois qu'elle n'en créera ?",
        options: ["32 %", "51 %", "77 %", "95 %"],
        correct: [2],
        fig: "77 %",
        figLabel: "des Français pensent que l'IA détruira plus d'emplois qu'elle n'en créera — un pessimisme marqué.",
        explain: "L'opinion est nettement pessimiste (plus des 3/4), alors que les analyses économiques penchent plutôt vers une transformation des métiers que vers leur disparition massive.",
        source: "Sondage opinion France (Odoxa), 2026"
      }
    ]
  }
];
