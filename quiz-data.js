// =====================================================================
//  Contenu des quiz — Console de formation 2026
//  Chaque quiz : { id, title, subtitle, icon, questions:[...] }
//  Question : correct = index des bonnes reponses (0=A,1=B,2=C,3=D).
//  multi:true => plusieurs bonnes reponses possibles.
//  anim = "dessin anime" explicatif joue apres la revelation.
//    beats: [{ ico, tag, t, big? }]
//    tag = intertitre (LE CONSTAT, POURQUOI, A RETENIR...)
//    big:true => affiche le chiffre geant + confettis sur ce temps.
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
        source: "Gallup — State of the Global Workplace 2026",
        anim: { beats: [
          { ico: "🧑‍💼", tag: "La question", t: "« Manager, c'est valorisant ! »… du moins, ça l'était." },
          { ico: "📉", tag: "Le chiffre", t: "L'engagement des managers chute de 31 % à 22 % en 3 ans.", big: true },
          { ico: "📉", tag: "Le contexte", t: "Dont −5 points rien qu'en 2024-2025 : la plus forte baisse annuelle jamais mesurée par Gallup." },
          { ico: "🥪", tag: "Pourquoi", t: "L'effet sandwich : coincés entre la pression de la direction et le désengagement de leurs équipes." },
          { ico: "💡", tag: "À retenir", t: "Un manager démotivé démotive son équipe. Soutenir les managers, c'est protéger tout le collectif." }
        ] }
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
        source: "Étude 2026 relayée par Mediavenir",
        anim: { beats: [
          { ico: "👩‍💼", tag: "La question", t: "48 % des managers sont des femmes. La parité serait-elle gagnée ?" },
          { ico: "🚪", tag: "Le chiffre", t: "En comité de direction : seulement 24 % de femmes.", big: true },
          { ico: "⚖️", tag: "Le contexte", t: "Deux fois moins qu'à l'échelon manager : la part chute à mesure qu'on s'élève dans la hiérarchie." },
          { ico: "🪜", tag: "Pourquoi", t: "Plafond de verre : mobilité freinée, réseaux moins ouverts, biais de cooptation au sommet." },
          { ico: "💡", tag: "À retenir", t: "La parité se joue dans les promotions vers le top, pas seulement au moment de l'embauche." }
        ] }
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
        source: "Lab des Futurs × Ipsos, 2026",
        anim: { beats: [
          { ico: "🧑‍💼", tag: "La question", t: "18 h, le manager ferme l'ordinateur. Déconnexion réussie ?" },
          { ico: "🧠", tag: "Le chiffre", t: "3 managers sur 4 continuent à penser au travail… hors du travail.", big: true },
          { ico: "⏰", tag: "Le contexte", t: "S'y ajoutent 31 % qui font 50 h et plus par semaine, et 51 % qui travaillent régulièrement sous pression." },
          { ico: "📱", tag: "Pourquoi", t: "Hyper-connexion, sur-sollicitation, réunions en rafale : la charge mentale déborde le bureau." },
          { ico: "💡", tag: "À retenir", t: "Droit à la déconnexion et priorisation ne sont pas un luxe, mais une hygiène de performance durable." }
        ] }
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
        source: "Capstan / SFR Business, 2026",
        anim: { beats: [
          { ico: "🏢", tag: "La question", t: "« 2026, l'année du grand retour au bureau ! »… pariaient certains." },
          { ico: "🏡", tag: "Le chiffre", t: "94 % des entreprises maintiennent leur politique de télétravail.", big: true },
          { ico: "📊", tag: "Le contexte", t: "En 2025, seules 9 % l'avaient réduit. La tendance de fond, c'est la stabilité." },
          { ico: "🤝", tag: "Pourquoi", t: "Près d'un salarié sur deux l'utilise, avec 92 % de satisfaction : y toucher coûterait cher en attractivité." },
          { ico: "💡", tag: "À retenir", t: "Le vrai sujet n'est plus « présentiel ou pas », mais comment bien manager en mode hybride." }
        ] }
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
        source: "Baromètre Syntec Numérique / Dynexio, 2026",
        anim: { beats: [
          { ico: "🧑‍💼", tag: "La question", t: "« L'IA, c'est pour les geeks, pas pour mon service. »" },
          { ico: "🤖", tag: "Le chiffre", t: "73 %+ des grandes entreprises ont déjà déployé ou testé un assistant IA.", big: true },
          { ico: "🇫🇷", tag: "Le contexte", t: "La France est même en tête en Europe : plus de 166 000 offres d'emploi liées à l'IA en 2026." },
          { ico: "🧭", tag: "Pourquoi", t: "Piloter l'IA devient une compétence managériale de base — sans besoin d'être data scientist." },
          { ico: "💡", tag: "À retenir", t: "Le rôle du manager : cadrer les usages, monter l'équipe en compétence, garder l'humain aux commandes." }
        ] }
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
        source: "KPMG / OpinionWay, 2026",
        anim: { beats: [
          { ico: "🧑‍💻", tag: "La question", t: "« Qui utilise vraiment l'IA au bureau ? »" },
          { ico: "✋", tag: "Le chiffre", t: "Près d'un salarié du privé sur deux : environ 47 %.", big: true },
          { ico: "📈", tag: "Le contexte", t: "Mais l'usage régulier (au moins une fois par semaine) ne concerne que 24 % : l'adoption est encore jeune." },
          { ico: "🤫", tag: "Pourquoi", t: "Beaucoup testent seuls, sans cadre ni formation : l'usage précède l'organisation." },
          { ico: "💡", tag: "À retenir", t: "L'enjeu n'est plus d'adopter l'IA, mais d'en structurer et d'en fiabiliser l'usage au quotidien." }
        ] }
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
        source: "Étude adoption IA France, 2026",
        anim: { beats: [
          { ico: "🧑‍💼", tag: "La question", t: "L'IA au travail, tout le monde à la même enseigne ?" },
          { ico: "👷", tag: "Le chiffre", t: "78 % des cadres l'utilisent… contre 29 % des ouvriers.", big: true },
          { ico: "📊", tag: "Le contexte", t: "Un rapport du simple au triple : la fracture de l'IA est d'abord socioprofessionnelle." },
          { ico: "🖥️", tag: "Pourquoi", t: "Accès aux outils, temps disponible, formation : tout se concentre sur les métiers de bureau." },
          { ico: "💡", tag: "À retenir", t: "Sans effort ciblé vers le terrain, l'IA risque de creuser les inégalités au lieu de les réduire." }
        ] }
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
        source: "Baromètre formation IA, 2026",
        anim: { beats: [
          { ico: "🎓", tag: "La question", t: "L'IA arrive partout. Et la formation, elle suit ?" },
          { ico: "🙋", tag: "Le chiffre", t: "Seulement 12 % des salariés ont été formés à l'IA en entreprise.", big: true },
          { ico: "⚖️", tag: "Le contexte", t: "Alors même que l'AI Act impose désormais un socle minimal de compétences (« AI literacy »)." },
          { ico: "🏊", tag: "Pourquoi", t: "Résultat : on manie des outils puissants sans en maîtriser ni les limites ni les risques." },
          { ico: "💡", tag: "À retenir", t: "Former, c'est réduire les erreurs, les fuites de données… et la peur de l'outil." }
        ] }
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
        source: "Étude Shadow AI, 2026",
        anim: { beats: [
          { ico: "🕵️", tag: "La question", t: "Vos équipes utilisent-elles l'IA… à votre insu ?" },
          { ico: "🙈", tag: "Le chiffre", t: "68 % des collaborateurs le font sans prévenir leur hiérarchie.", big: true },
          { ico: "🔓", tag: "Le contexte", t: "C'est le « shadow AI » : des données parfois sensibles copiées dans des outils non validés." },
          { ico: "🚫", tag: "Pourquoi", t: "Interdire ne fonctionne pas : les collaborateurs contournent la règle pour gagner du temps." },
          { ico: "💡", tag: "À retenir", t: "Une charte d'usage claire vaut mieux qu'une interdiction inapplicable et une prise de risque cachée." }
        ] }
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
        source: "INSEE, 2026",
        anim: { beats: [
          { ico: "⏰", tag: "La question", t: "Combien de temps l'IA fait-elle vraiment gagner ?" },
          { ico: "🚀", tag: "Le chiffre", t: "Jusqu'à 11 heures par semaine pour les cadres utilisant Copilot (INSEE).", big: true },
          { ico: "✍️", tag: "Le contexte", t: "Surtout sur les tâches répétitives : rédaction, synthèse, e-mails, recherche d'informations." },
          { ico: "⚠️", tag: "Pourquoi", t: "Mais ce gain profite d'abord aux profils déjà équipés et formés — d'où le risque d'écart qui se creuse." },
          { ico: "💡", tag: "À retenir", t: "Bien déployée, l'IA libère du temps pour ce qui compte : décider, créer, accompagner." }
        ] }
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
        source: "ADP — People at Work 2026",
        anim: { beats: [
          { ico: "😱", tag: "La question", t: "« L'IA va tous nous remplacer ! » — la panique est-elle justifiée ?" },
          { ico: "😌", tag: "Le chiffre", t: "En réalité, seuls ~10 % des salariés le craignent fortement.", big: true },
          { ico: "👀", tag: "Le contexte", t: "La peur progresse tout de même (+2 pts vs 2025) et se concentre chez les moins de 40 ans." },
          { ico: "🧩", tag: "Pourquoi", t: "Nuance : 45 % des salariés et 61 % des cadres redoutent un remplacement au moins partiel." },
          { ico: "💡", tag: "À retenir", t: "La transparence et la formation désamorcent l'anxiété bien plus que le silence." }
        ] }
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
        source: "Direction générale du Trésor, 2026",
        anim: { beats: [
          { ico: "🤖", tag: "La question", t: "Combien de métiers l'IA va-t-elle vraiment supprimer ?" },
          { ico: "✂️", tag: "Le chiffre", t: "Seulement 5 % des emplois sont jugés totalement automatisables (DG Trésor).", big: true },
          { ico: "🧩", tag: "Le contexte", t: "La grande majorité évolue par recomposition : certaines tâches automatisées, mais pas le poste entier." },
          { ico: "🔄", tag: "Pourquoi", t: "L'IA transforme le contenu du travail bien plus qu'elle ne le fait disparaître." },
          { ico: "💡", tag: "À retenir", t: "La bonne question managériale : quelles tâches déléguer à l'IA pour recentrer l'humain sur l'essentiel ?" }
        ] }
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
        source: "McKinsey / baromètres IA entreprise, 2026",
        anim: { beats: [
          { ico: "📊", tag: "La question", t: "Déployer l'IA, ça rapporte vraiment à l'entreprise ?" },
          { ico: "📈", tag: "Le chiffre", t: "+15 à 30 % de productivité sur les processus clés.", big: true },
          { ico: "✅", tag: "Le contexte", t: "66 % des organisations qui déploient l'IA constatent une hausse mesurable de leur productivité." },
          { ico: "🧑‍🏫", tag: "Pourquoi", t: "Le frein n°1 n'est pas la techno mais les compétences (61 % des dirigeants) ; 60 % des PME n'ont aucune stratégie IA." },
          { ico: "💡", tag: "À retenir", t: "Le retour sur investissement de l'IA dépend surtout de l'accompagnement humain, pas de l'outil seul." }
        ] }
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
        source: "AI Act (UE) & CNIL, 2026",
        anim: { beats: [
          { ico: "📜", tag: "La question", t: "L'IA au travail, c'est encore le Far West sans règles ?" },
          { ico: "⚖️", tag: "Le chiffre", t: "Non : l'AI Act impose un socle de compétences IA aux salariés concernés.", big: true },
          { ico: "📝", tag: "Le contexte", t: "S'y ajoutent le RGPD, la directive NIS2, et la CNIL qui en fait un point de contrôle prioritaire." },
          { ico: "🛡️", tag: "Pourquoi", t: "Cyberassureurs et régulateurs poussent à formaliser une charte d'usage claire et opposable." },
          { ico: "💡", tag: "À retenir", t: "La charte IA devient le nouveau règlement intérieur : à écrire avant l'incident, pas après." }
        ] }
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
        source: "Sondage opinion France (Odoxa), 2026",
        anim: { beats: [
          { ico: "🇫🇷", tag: "La question", t: "Les Français, optimistes ou pessimistes sur l'IA et l'emploi ?" },
          { ico: "🙋", tag: "Le chiffre", t: "77 % pensent qu'elle détruira plus d'emplois qu'elle n'en créera.", big: true },
          { ico: "🔮", tag: "Le contexte", t: "Un pessimisme net… que les analyses économiques ne confirment pas vraiment à ce jour." },
          { ico: "🧩", tag: "Pourquoi", t: "Les études penchent plutôt pour une transformation des métiers qu'une disparition massive d'emplois." },
          { ico: "💡", tag: "À retenir", t: "Le rôle du manager : donner du sens et de la visibilité pour transformer la peur en projet d'équipe." }
        ] }
      }
    ]
  }
];
