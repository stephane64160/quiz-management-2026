# Console de formation 2026 — temps réel (type Kahoot)

Console interactive à animer en direct pendant une formation. Chaque participant
rejoint depuis son **téléphone** en scannant un **QR code** et choisit un **pseudo**.
Sur son écran, l'animateur dispose d'un **sommaire** et choisit l'activité à lancer :

- 📊 **Quiz — Le management en France 2026** (5 questions)
- 🤖 **Quiz — L'IA au travail en France 2026** (10 questions)
- 💬 **Mur de mots** — chaque participant envoie un ou plusieurs mots qui
  s'affichent en direct dans un nuage (taille selon la fréquence).

Pour les quiz, l'animateur voit l'**analyse des réponses par question en direct**
(barres qui se remplissent) puis un **classement final**.

## Contenu

| Fichier | Rôle |
|---|---|
| `server.js` | Serveur temps réel (Express + Socket.IO). État de session, validation des réponses, agrégation du mur de mots. |
| `public/host.html` | Écran **animateur** : sommaire, QR code, activités, barres live, classement, mur de mots. |
| `public/play.html` | Page **participant** (mobile) : pseudo → l'écran s'adapte à l'activité lancée. |
| `quiz-data.js` | Les **quiz** (questions, réponses, sources). **Modifiez ici pour changer / ajouter un quiz.** |

Le texte d'invite du **mur de mots** se règle en haut de `server.js` (constante `WALL`).

## 1. Lancer en local (test)

Prérequis : [Node.js](https://nodejs.org) 18 ou plus.

```bash
npm install
npm start
```

Puis, sur ce PC :

- **Animateur** → http://localhost:3000/host
- **Joueur** → http://localhost:3000/

## 2. Jouer sur le même Wi-Fi (sans Internet)

1. Trouvez l'IP locale de ce PC :
   - Windows : `ipconfig` → ligne « Adresse IPv4 » (ex. `192.168.1.20`)
2. Ouvrez le tableau de bord : `http://192.168.1.20:3000/host`
   Le QR code affiché pointe automatiquement vers la bonne adresse.
3. Les participants scannent le QR (même réseau Wi-Fi) → ils arrivent sur la page pseudo.
4. Autorisez le port 3000 dans le pare-feu Windows si demandé.

## 3. Déployer sur Internet (participants à distance)

Vous avez choisi un accès **par Internet**. Deux options :

### Option A — Render (hébergement gratuit, URL publique permanente)

1. Créez un dépôt Git avec ces fichiers et poussez-le sur GitHub.
2. Sur [render.com](https://render.com) → **New → Web Service** → connectez le dépôt.
3. Réglages :
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - Render fournit automatiquement la variable `PORT` (déjà gérée dans `server.js`).
4. Une fois déployé, votre URL ressemble à `https://mon-quizz.onrender.com`.
   - Animateur : `https://mon-quizz.onrender.com/host`
   - Le QR code du tableau de bord encode automatiquement l'URL publique.

> Astuce : le plan gratuit Render « s'endort » après inactivité. Ouvrez le
> tableau de bord 1–2 minutes avant la formation pour le réveiller.

### Option B — Tunnel ngrok (rapide, depuis ce PC)

Gardez le serveur local lancé (`npm start`), puis dans un autre terminal :

```bash
npx ngrok http 3000
```

ngrok affiche une URL publique `https://xxxx.ngrok-free.app`. Ouvrez
`https://xxxx.ngrok-free.app/host` : le QR encode cette URL, jouable depuis
n'importe quel réseau.

## Déroulé le jour J

1. Projetez l'**écran animateur** (`/host`) — il s'ouvre sur le **sommaire**.
2. Les participants scannent le **QR code** et saisissent leur **pseudo** → ils apparaissent en direct.
3. Cliquez sur une **activité** du sommaire :
   - **Quiz** → écran « prêt » → **Démarrer** → pour chaque question, les **barres** se remplissent en direct → **Révéler la bonne réponse** (stat + source, pour lancer la discussion) → **Question suivante** → **podium & classement**.
   - **Mur de mots** → les participants tapent un ou plusieurs mots → le **nuage** se remplit en direct (mots fréquents plus gros). Bouton **Effacer le mur**.
4. Bouton **← Sommaire** à tout moment pour changer d'activité.
5. Bouton **Vider la salle** (dans le sommaire) pour repartir avec un nouveau groupe.

## Notes

- Les bonnes réponses des quiz restent **côté serveur** et ne sont envoyées aux téléphones qu'au moment de la révélation (pas de triche).
- Score = bonnes réponses + **bonus de rapidité** (répondre vite rapporte plus).
- La console gère **une salle** à la fois (idéal pour un groupe en formation).
- **Ajouter un quiz** : dupliquez un bloc dans `quiz-data.js` (id, title, subtitle, icon, questions). Il apparaît automatiquement dans le sommaire.
- Les statistiques proviennent d'articles et baromètres 2025-2026 (voir sources dans `quiz-data.js`) ; vérifiez les chiffres que vous mettez le plus en avant avant de les présenter comme officiels.
